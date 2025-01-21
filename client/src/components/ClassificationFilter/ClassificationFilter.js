import React from "react";
import { Box } from "@mui/material";
import "./ClassificationFilter.css";

const ClassificationFilter = ({
  selectedClassifications,
  setSelectedClassifications,
}) => {
  const handleCheckboxChange = (classification) => {
    setSelectedClassifications((prev) => ({
      ...prev,
      [classification]: !prev[classification],
    }));
  };

  const getLegendItem = (classification) => {
    if (classification === "Class I") {
      return (
        <div className="legend-item">
          <div className="color-box class-i"></div>
          <span>Class I (Low Risk)</span>
        </div>
      );
    } else if (classification === "Class II") {
      return (
        <div className="legend-item">
          <div className="color-box class-ii"></div>
          <span>Class II (Medium Risk)</span>
        </div>
      );
    } else if (classification === "Class III") {
      return (
        <div className="legend-item">
          <div className="color-box class-iii"></div>
          <span>Class III (High Risk)</span>
        </div>
      );
    }
  };

  return (
    <Box className="legend-wrapper">
      {Object.keys(selectedClassifications).map((classification) => (
        <label key={classification}>
          <input
            type="checkbox"
            checked={selectedClassifications[classification]}
            onChange={() => handleCheckboxChange(classification)}
          />
          {getLegendItem(classification)}
        </label>
      ))}
    </Box>
  );
};

export default ClassificationFilter;
