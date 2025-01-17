import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getClassificationColor } from "../utils/getClassificationColor";

const RecallsAccordion = ({ groupedRecalls = {} }) => {
  if (!groupedRecalls) {
    return null;
  }

  return Object.keys(groupedRecalls).map((firm, index) => (
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
          <div key={recall.recall_number || recallIndex}>
            <Typography>
              <strong>Product Description:</strong> {recall.product_description}
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
              <strong>Date Initiated:</strong> {recall.recall_initiation_date}
            </Typography>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  ));
};

export default RecallsAccordion;
