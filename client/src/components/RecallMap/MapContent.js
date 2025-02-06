import React, { useMemo } from 'react';
import { TileLayer, GeoJSON, Marker, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
	getMapMarkerIcon,
	getOffsetPosition,
	groupRecallsByStateAndClassification,
} from '../utils';
import { polygonBaseStyle, polygonHighlightStyle } from '../constants';
import { stateCoordinates } from '../constants';
import RecallPopup from '../RecallPopup/RecallPopup';
import './RecallMap.css';

const MapContent = ({
	recalls = [],
	stateBoundsData,
	selectedClassifications,
	setExpandedState,
}) => {
	// Fix marker icon issues
	delete L.Icon.Default.prototype._getIconUrl;

	const recallGroups = useMemo(
		() => groupRecallsByStateAndClassification(recalls),
		[recalls]
	);

	const onEachFeature = (feature, layer) => {
		if (!feature.properties) return;

		layer.bindPopup(feature.properties.name);

		layer.on({
			mouseover: (e) => {
				const layer = e.target;
				layer.setStyle(polygonHighlightStyle);
			},
			mouseout: (e) => {
				const layer = e.target;
				layer.setStyle(polygonBaseStyle);
			},
			click: (e) => {
				const map = e.target._map;
				map.flyToBounds(e.target.getBounds(), {
					duration: 1.5,
					easeLinearity: 0.25,
				});
				setExpandedState(feature.properties.name);
			},
		});
	};

	return (
		<>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			/>
			{stateBoundsData?.features?.length > 0 && (
				<GeoJSON
					data={stateBoundsData}
					style={polygonBaseStyle}
					onEachFeature={onEachFeature}
				>
					{recallGroups &&
						Object.entries(recallGroups || {}).map(([state, classGroups]) => {
							const coords = stateCoordinates[state];
							if (!coords) {
								console.warn(`No coordinates found for state: ${state}`);
								return null;
							}

							return Object.entries(classGroups || {}).map(
								([classification, recalls], groupIndex) => {
									if (
										!recalls ||
										recalls.length === 0 ||
										!selectedClassifications[classification]
									)
										return null;

									const position = getOffsetPosition(
										coords,
										groupIndex,
										Object.keys(classGroups || {}).length
									);

									if (!position) return null;

									return (
										<Marker
											key={`${state}-${classification}-${groupIndex}`}
											position={position}
											icon={getMapMarkerIcon(classification)}
										>
											<RecallPopup
												state={state}
												classification={classification}
												recalls={recalls}
											/>
										</Marker>
									);
								}
							);
						})}
				</GeoJSON>
			)}
		</>
	);
};

export default MapContent;
