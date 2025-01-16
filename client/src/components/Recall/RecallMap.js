import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import stateCoordinates from "../utils/stateCoordinates";
import groupRecallsByStateAndClassification from "../utils/groupRecallsByStateAndClassification";
import getMapMarkerIcon from "../utils/getMapMarkerIcon";
import "./RecallMap.css";

// Fix marker icon issues
delete L.Icon.Default.prototype._getIconUrl;

const defaultZoom = 5;
const centerCoords = [39.8283, -98.5795];

// Calculate offset positions in a circle around center point
const getOffsetPosition = (baseCoords, index, total) => {
  // Handle array or object coordinate format
  const lat = Array.isArray(baseCoords) ? baseCoords[0] : baseCoords.lat;
  const lng = Array.isArray(baseCoords) ? baseCoords[1] : baseCoords.lng;

  if (total === 1) return [lat, lng];

  // Increased radius for wider spread
  const radius = 0.5;

  // Add variation based on classification index
  const angleOffset = index * (Math.PI / 6); // 30 degree offset per classification
  const angle = (2 * Math.PI * index) / total + angleOffset;

  return [lat + radius * Math.cos(angle), lng + radius * Math.sin(angle)];
};

const MapContent = ({ recalls }) => {
  const recallGroups = groupRecallsByStateAndClassification(recalls);

  console.log("Recall groups:", recallGroups); // Debug log

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {Object.entries(recallGroups).map(([state, classGroups]) => {
        const coords = stateCoordinates[state];
        console.log("coords", coords);
        if (!coords) {
          console.warn(`No coordinates found for state: ${state}`);
          return null;
        }

        return Object.entries(classGroups).map(
          ([classification, recalls], groupIndex) => {
            if (recalls.length === 0) return null;

            const position = getOffsetPosition(
              coords,
              classification === "Class I"
                ? 0
                : classification === "Class II"
                ? 1
                : 2,
              3
            );

            return (
              <Marker
                key={`${state}-${classification}-${groupIndex}`}
                position={position}
                icon={getMapMarkerIcon(classification)}
              >
                <Popup className="recall-popup">
                  <h4>
                    {state} - {classification}
                  </h4>
                  <p>
                    <strong>Total Recalls: {recalls.length}</strong>
                  </p>
                  <div className="recall-list">
                    {recalls.slice(0, 5).map((recall, idx) => (
                      <div key={idx} className="recall-item">
                        <p>
                          <h4>{recall.recalling_firm}</h4>
                        </p>
                        <p>{recall.product_description}</p>
                        <p>
                          <strong>Reason:</strong> {recall.reason_for_recall}
                        </p>
                      </div>
                    ))}
                    {recalls.length > 5 && (
                      <p className="more-recalls">
                        + {recalls.length - 5} more recalls...
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          }
        );
      })}
    </>
  );
};

const RecallMap = ({ recalls }) => {
  if (!recalls || recalls.length === 0) {
    return <div>No recall data available</div>;
  }

  return (
    <MapContainer
      center={centerCoords}
      zoom={defaultZoom}
      style={{ height: "70vh", width: "100%" }}
    >
      <MapContent recalls={recalls} />
    </MapContainer>
  );
};

export default RecallMap;
