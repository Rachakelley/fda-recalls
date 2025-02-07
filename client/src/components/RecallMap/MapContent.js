import React, { useMemo } from 'react';
import { TileLayer, GeoJSON, Marker } from 'react-leaflet';
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

const highlightState = (e) => {
	e.target.setStyle(polygonHighlightStyle);
};

const resetHighlight = (e) => {
	e.target.setStyle(polygonBaseStyle);
};

const handleMouseOver = (e) => {
	e.target.setStyle(polygonHighlightStyle);
};

const handleMouseOut = (e) => {
	e.target.setStyle(polygonBaseStyle);
};

const MapContent = ({
	recalls = [],
	stateBoundsData,
	selectedClassifications,
	setIsStateAccordionExpanded,
	isSidebarExpanded,
}) => {
	// Fix marker icon issues
	delete L.Icon.Default.prototype._getIconUrl;

	const recallGroups = useMemo(
		() => groupRecallsByStateAndClassification(recalls),
		[recalls]
	);

	const zoomToState = (e) => {
		const map = e.target._map;
		const bounds = e.target.getBounds();

		map.flyToBounds(bounds, {
			duration: 1.5,
			easeLinearity: 0.25,
			maxZoom: 5,
			minZoom: 5,
			paddingBottomRight: isSidebarExpanded ? [275, 100] : [0, 75], // Offset for sidebar
		});
	};

	const onEachFeature = (feature, layer) => {
		if (!feature.properties) return;

		layer.bindPopup(feature.properties.name);

		layer.on({
			mouseover: handleMouseOver,
			mouseout: handleMouseOut,
			click: (e) => {
				highlightState(e);
				zoomToState(e);
				setIsStateAccordionExpanded(e.target.feature.properties.name);
			},
			popupclose: resetHighlight,
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
					key={JSON.stringify(isSidebarExpanded)} // Force re-render on sidebar toggle, otherwise isSidebarExpanded value is stale
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
