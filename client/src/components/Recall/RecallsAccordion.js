import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getClassificationColor } from "../utils/getClassificationColor";
import "./RecallsAccordion.css";

const getClassificationPriority = (classification) => {
  switch (classification) {
    case "Class I":
      return 1;
    case "Class II":
      return 2;
    case "Class III":
      return 3;
    default:
      return 0;
  }
};

const RecallsAccordion = ({ groupedRecalls = {} }) => {
  if (!groupedRecalls) {
    return null;
  }

  return Object.keys(groupedRecalls)
    .sort((a, b) => {
      const classA = groupedRecalls[a][0].classification;
      const classB = groupedRecalls[b][0].classification;
      return (
        getClassificationPriority(classB) - getClassificationPriority(classA)
      );
    })
    .map((firm, index) => (
      <Accordion
        key={firm || index}
        sx={{
          "& .MuiAccordionSummary-root": {
            backgroundColor: getClassificationColor(
              groupedRecalls[firm][0].classification
            ),
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`recall-${index}-content`}
          id={`recall-${index}-header`}
        >
          <Typography sx={{ fontWeight: "bold" }}>{firm}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {groupedRecalls[firm].map((recall, recallIndex) => (
            <div
              className="recall-accordion-entry"
              key={recall.recall_number || recallIndex}
            >
              <Typography>
                <strong>Product Description:</strong>{" "}
                {recall.product_description}
              </Typography>
              <Typography>
                <strong>Reason for Recall:</strong> {recall.reason_for_recall}
              </Typography>
              <Typography>
                <strong>Distribution:</strong> {recall.distribution_pattern}
              </Typography>
              <Typography>
                <strong>Status:</strong> {recall.status}
              </Typography>
              <Typography>
                <strong>Date Initiated:</strong>{" "}
                {recall.recall_initiation_date
                  ? (() => {
                      try {
                        const date = recall.recall_initiation_date;
                        const year = date.substring(0, 4);
                        const month = date.substring(4, 6);
                        const day = date.substring(6, 8);
                        return `${month}/${day}/${year}`;
                      } catch {
                        return "Date not available";
                      }
                    })()
                  : "Date not available"}
              </Typography>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    ));
};

export default RecallsAccordion;
