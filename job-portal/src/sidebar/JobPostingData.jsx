import React from "react";
import InputFeild from "../components/InputFeild";

const JobPostingData = ({ handleChange }) => {
  const now = new Date();

  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const SevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const ThirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  // Convert date to ISO 8601 format (YYYY-MM-DD)
  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const SevenDaysAgoDate = SevenDaysAgo.toISOString().slice(0, 10);
  const ThirtyDaysAgoDate = ThirtyDaysAgo.toISOString().slice(0, 10);

  return (
    <div className="mb-6">
      <h4 className="text-lg font-medium mb-2">Date of Posting</h4>

      <div className="space-y-2">
        <InputFeild
          handleChange={handleChange}
          value=""
          title="All time"
          name="date"
        />
        <InputFeild
          handleChange={handleChange}
          value={twentyFourHoursAgoDate}
          title="Last 24 hours"
          name="date"
        />
        <InputFeild
          handleChange={handleChange}
          value={SevenDaysAgoDate}
          title="Last 7 days"
          name="date"
        />
        <InputFeild
          handleChange={handleChange}
          value={ThirtyDaysAgoDate}
          title="Last Month"
          name="date"
        />
      </div>
    </div>
  );
};

export default JobPostingData;
