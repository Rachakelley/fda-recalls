import React from 'react';
import { Box } from '@mui/material';
import './Legend.css';

const Legend = () => {
  return (
    <Box className="legend-wrapper">
      <div className="legend-item">
        <div className="color-box class-i"></div>
        <span>Class I (Low Risk)</span>
      </div>
      <div className="legend-item">
        <div className="color-box class-ii"></div>
        <span>Class II (Medium Risk)</span>
      </div>
      <div className="legend-item">
        <div className="color-box class-iii"></div>
        <span>Class III (High Risk)</span>
      </div>
    </Box>
  );
};

export default Legend;