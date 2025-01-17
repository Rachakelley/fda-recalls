import React from "react";
import { Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RecallPopup = ({ state, classification, recalls }) => {
  return (
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
            <h4>{recall.recalling_firm}</h4>
            <p>{recall.product_description}</p>
            <p>
              <strong>Reason:</strong> {recall.reason_for_recall}
            </p>
          </div>
        ))}
        {recalls.length > 5 && (
          <p className="more-recalls">+ {recalls.length - 5} more recalls...</p>
        )}
      </div>
    </Popup>
  );
};

export default RecallPopup;
