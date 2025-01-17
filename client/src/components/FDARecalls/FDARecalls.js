import React from "react";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client";

import Recalls from "../Recall/Recalls";
import Legend from "../Legend/Legend";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import LimitSelector from "../LimitSelector/LimitSelector";
import RecallMap from "../Recall/RecallMap";
import { getRecalls } from "../../queries/getRecalls";

import "./FDARecalls.css";

const today = dayjs();
const yesterday = today.subtract(30, "day");

const FDARecalls = () => {
  const [startDate, setStartDate] = React.useState(yesterday);
  const [endDate, setEndDate] = React.useState(today);
  const [limit, setLimit] = React.useState(10);

  const { loading, error, data } = useQuery(getRecalls, {
    variables: {
      startDate: startDate.format("YYYYMMDD"),
      endDate: endDate.format("YYYYMMDD"),
      limit: parseInt(limit),
    },
  });

  const { results: recalls, total_results: totalRecalls } = data?.recalls || {};

  return (
    <div>
      <h2>FDA Recalls</h2>
      <div className="recalls-date-limit-wrapper">
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
        />
      </div>
      <div className="recalls-container">
        <RecallMap recalls={recalls} loading={loading} />
        <div className="legend-container">
          <Legend />
        </div>
        <Recalls loading={loading} error={error} results={recalls} />
      </div>
    </div>
  );
};

export default FDARecalls;
