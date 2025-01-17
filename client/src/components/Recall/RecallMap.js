import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import stateCoordinates from "../utils/stateCoordinates";
import groupRecallsByStateAndClassification from "../utils/groupRecallsByStateAndClassification";
import getMapMarkerIcon from "../utils/getMapMarkerIcon";
import "./RecallMap.css";
import RecallPopup from "../RecallPopup/RecallPopup";

// Fix marker icon issues
delete L.Icon.Default.prototype._getIconUrl;

const defaultZoom = 4;
const centerCoords = [39.8283, -98.5795];

const getOffsetPosition = (baseCoords, index, total) => {
  const lat = Array.isArray(baseCoords) ? baseCoords[0] : baseCoords.lat;
  const lng = Array.isArray(baseCoords) ? baseCoords[1] : baseCoords.lng;

  if (total === 1) return [lat, lng];

  // Increased radius for wider spread
  const radius = 0.75;
  // Calculate angle based on index and total classifications
  const angle = (2 * Math.PI * index) / total;

  return [lat + radius * Math.cos(angle), lng + radius * Math.sin(angle)];
};

const MapContent = ({ recalls }) => {
  const recallGroups = groupRecallsByStateAndClassification(recalls);

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {recallGroups &&
        Object.entries(recallGroups || {}).map(([state, classGroups]) => {
          const coords = stateCoordinates[state];
          if (!coords) {
            console.warn(`No coordinates found for state: ${state}`);
            return null;
          }

          return Object.entries(classGroups || {}).map(
            ([classification, recalls], groupIndex) => {
              if (!recalls || recalls.length === 0) return null;

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
    </>
  );
};

const RecallMap = ({ recalls, loading }) => {
  if (!recalls || recalls.length === 0) {
    return <div>No recalls found.</div>;
  }

  return (
    <MapContainer
      className="recall-map"
      center={centerCoords}
      zoom={defaultZoom}
    >
      <MapContent recalls={recalls} />
    </MapContainer>
  );
};

export default RecallMap;
