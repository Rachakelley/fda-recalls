import React from 'react';
import { MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CENTER_COORDS, DEFAULT_ZOOM, MIN_ZOOM } from '../constants';
import MapContent from './MapContent';
import './RecallMap.css';

const RecallMap = ({
	recalls,
	stateBoundsData,
	selectedClassifications,
	setIsStateAccordionExpanded,
	loadingRecallData,
	isSidebarExpanded,
}) => {
	if ((!recalls || recalls.length === 0) && !loadingRecallData) {
		return <div>No recalls found.</div>;
	}

	return (
		<div className='recall-map-container'>
			<MapContainer
				className='recall-map'
				center={CENTER_COORDS}
				zoom={DEFAULT_ZOOM}
				minZoom={MIN_ZOOM}
			>
				<MapContent
					recalls={recalls}
					stateBoundsData={stateBoundsData}
					selectedClassifications={selectedClassifications}
					setIsStateAccordionExpanded={setIsStateAccordionExpanded}
					isSidebarExpanded={isSidebarExpanded}
				/>
			</MapContainer>
		</div>
	);
};

export default RecallMap;
