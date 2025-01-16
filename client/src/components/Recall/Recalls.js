import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getClassificationColor } from "../utils/getClassificationColor";
import RecallMap from "./RecallMap";

function Recalls() {
  const [recalls, setRecalls] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = `
      query {
        recalls(limit: 5) {
          classification
          distribution_pattern
          recalling_firm
          product_description
          reason_for_recall
          recall_initiation_date
          recall_number
          status
        }
      }
    `;

    axios
      .post("/graphql", {
        query: query,
      })
      .then((response) => setRecalls(response.data.data.recalls))
      .catch((error) => setError("Error fetching recalls: " + error.message));
  }, []);

  return (
    <div>
      <RecallMap recalls={recalls} />
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {recalls &&
            recalls.map((recall, index) => (
              <Accordion
                key={recall.recall_number || index}
                sx={{
                  "& .MuiAccordionSummary-root": {
                    backgroundColor: getClassificationColor(
                      recall.classification
                    ),
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`recall-${index}-content`}
                  id={`recall-${index}-header`}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {recall.recalling_firm}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <strong>Product Description:</strong>{" "}
                    {recall.product_description}
                  </Typography>
                  <Typography>
                    <strong>Reason for Recall:</strong>{" "}
                    {recall.reason_for_recall}
                  </Typography>
                  <Typography>
                    <strong>Distribution:</strong> {recall.distribution_pattern}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong> {recall.status}
                  </Typography>
                  <Typography>
                    <strong>Date Initiated:</strong>{" "}
                    {recall.recall_initiation_date}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
      )}
    </div>
  );
}

export default Recalls;
