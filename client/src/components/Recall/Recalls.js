import React from "react";
import { CircularProgress, Box } from "@mui/material";
import RecallMap from "./RecallMap";
import RecallsAccordion from "./RecallsAccordion";

function Recalls({ loading, error, results }) {
  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Error: {error.message}</div>;

  // Ensure recalls is always an array
  const recalls = Array.isArray(results) ? results : [];

  // groups an array of recall objects by the recalling_firm property
  const groupedRecalls =
    recalls &&
    recalls.reduce((groupsByRecall, recall) => {
      if (!groupsByRecall[recall.recalling_firm]) {
        groupsByRecall[recall.recalling_firm] = [];
      }
      groupsByRecall[recall.recalling_firm].push(recall);
      return groupsByRecall;
    }, {});

  return (
    <div>
      {/* <RecallMap recalls={recalls} loading={loading} />
            <div className="legend-container">
              <Legend />
            </div> */}
      {error ? (
        <p>{error}</p>
      ) : (
        <RecallsAccordion groupedRecalls={groupedRecalls} />
      )}
    </div>
  );
}

export default Recalls;
