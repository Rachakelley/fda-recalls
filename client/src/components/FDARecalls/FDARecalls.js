import React, { useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client";
import FilterListIcon from "@mui/icons-material/FilterList";
import { CircularProgress, Box } from "@mui/material";
import { getStateBounds } from "../../queries/getStateBounds";
import HoverPopover from "../Popover/HoverPopover";
import ClassificationFilter from "../ClassificationFilter/ClassificationFilter";
import Recalls from "../Recall/Recalls";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import LimitSelector from "../LimitSelector/LimitSelector";
import RecallMap from "../Recall/RecallMap";
import { getRecalls } from "../../queries/getRecalls";

import "./FDARecalls.css";

const today = dayjs();
const yesterday = today.subtract(30, "day");

const FDARecalls = () => {
  const [startDate, setStartDate] = useState(yesterday);
  const [endDate, setEndDate] = useState(today);
  const [limit, setLimit] = useState(10);
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedClassifications, setSelectedClassifications] = useState({
    "Class I": true,
    "Class II": true,
    "Class III": true,
  });
  const { loading, error, data } = useQuery(getRecalls, {
    variables: {
      startDate: startDate.format("YYYYMMDD"),
      endDate: endDate.format("YYYYMMDD"),
      limit: parseInt(limit),
    },
  });
  const { data: stateBoundsData, loading: stateBoundsLoading } =
    useQuery(getStateBounds);

  if (stateBoundsLoading || loading) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          zIndex: 1000,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const { results: recalls, total_results: totalRecalls } = data?.recalls || {};

  return (
    <div className="fda-recalls">
      <div
        className={`recalls-date-limit-tab ${isExpanded ? "expanded" : ""}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {<HoverPopover component={<FilterListIcon />} text="Filter" />}
      </div>
      <div
        className={`recalls-date-limit-wrapper ${isExpanded ? "expanded" : ""}`}
      >
        <div className="recalls-date-text">
          <p>
            Showing <strong>{limit}</strong> of{" "}
            <strong>{totalRecalls || 0}</strong> recalls from{" "}
            {startDate.format("MM/DD/YYYY")} to {endDate.format("MM/DD/YYYY")}
          </p>
        </div>
        <div className="results-limit">
          <p>Results Limit</p>
          <LimitSelector limit={limit} setLimit={setLimit} />
        </div>
        <DateRangePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          popoverProps={{
            slotProps: {
              paper: {
                "aria-modal": true,
                role: "dialog",
                inert: true,
                onKeyDown: (e) => {
                  if (e.key === "Escape") {
                    setEndDate(null);
                  }
                },
              },
            },
          }}
        />
      </div>
      <div className="recalls-container">
        <RecallMap
          recalls={recalls}
          stateBoundsData={stateBoundsData}
          selectedClassifications={selectedClassifications}
        />
        <div className="legend-container">
          <ClassificationFilter
            selectedClassifications={selectedClassifications}
            setSelectedClassifications={setSelectedClassifications}
          />
        </div>
        <Recalls loading={loading} error={error} results={recalls} />
      </div>
    </div>
  );
};

export default FDARecalls;
