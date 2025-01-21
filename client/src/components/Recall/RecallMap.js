import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
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
const minZoom = 3;
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

export const formatStateCoordinates = (coordinates) => {
  if (!coordinates || !Array.isArray(coordinates)) {
    return null;
  }

  // Handle MultiPolygon format
  if (Array.isArray(coordinates[0][0][0])) {
    return coordinates[0][0].map((coord) => [coord[1], coord[0]]);
  }

  // Handle Polygon format
  if (Array.isArray(coordinates[0][0])) {
    return coordinates[0].map((coord) => [coord[1], coord[0]]);
  }

  return null;
};

const MapContent = ({ recalls, stateBoundsData, selectedClassifications }) => {
  const recallGroups = groupRecallsByStateAndClassification(recalls);

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {stateBoundsData?.stateBounds
        .filter((stateBound) => {
          // Ensure required data exists
          if (!stateCoordinates || !stateBound?.state) {
            return false;
          }

          // Search through stateCoordinates keys for matching state name
          return Object.keys(stateCoordinates).some(
            (key) =>
              stateCoordinates[key]?.name?.toLowerCase() ===
              stateBound.state.toLowerCase()
          );
        })
        .map((stateBound) => {
          const validCoordinates = stateBound.coordinates
            ? formatStateCoordinates(stateBound.coordinates)
            : null;

          if (!validCoordinates) {
            console.warn(`Invalid coordinates for state: ${stateBound.state}`);
            return null;
          }

          return validCoordinates ? (
            <Polygon
              key={stateBound.state}
              positions={validCoordinates}
              color="white"
              fillColor="orange"
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillColor: "#FFA07A",
                    fillOpacity: 0.7,
                    weight: 2,
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillColor: "orange",
                    fillOpacity: 0.2,
                    fillRule: "evenodd",
                  });
                },
                click: (e) => {
                  const map = e.target._map;
                  map.flyToBounds(e.target.getBounds(), {
                    duration: 1.5,
                    easeLinearity: 0.25,
                  });
                },
              }}
            />
          ) : null;
        })}
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
    </>
  );
};

const RecallMap = ({ recalls, stateBoundsData, selectedClassifications }) => {
  if (!recalls || recalls.length === 0) {
    return <div>No recalls found.</div>;
  }

  return (
    <div className="recall-map-container">
      <MapContainer
        className="recall-map"
        center={centerCoords}
        zoom={defaultZoom}
        minZoom={minZoom}
      >
        <MapContent
          recalls={recalls}
          stateBoundsData={stateBoundsData}
          selectedClassifications={selectedClassifications}
        />
      </MapContainer>
    </div>
  );
};

export default RecallMap;
