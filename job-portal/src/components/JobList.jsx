import React, { useState } from "react";
import { fetchAdzunaJobs } from "../api/adzuna";
import { FiMapPin, FiClock, FiDollarSign } from "react-icons/fi";
import Banner from "./Banner";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery, searchLocation) => {
    setLoading(true);

    try {
      const apiJobs = await fetchAdzunaJobs(searchQuery, searchLocation);
      setJobs(apiJobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto mt-8 p-4">
      {/* Render Banner component for searching */}
      <Banner onSearch={handleSearch} />

      {loading && <p className="text-center text-xl mt-6">Loading...</p>}

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-primary mb-2">
                {job.title || "Job Title Not Available"}
              </h2>
              <p className="text-gray-700 mb-1">
                <strong>Company:</strong> {job.company?.display_name || "N/A"}
              </p>

              <div className="flex items-center text-gray-600 mb-1">
                <FiMapPin className="mr-2" />
                <span>
                  {job.location?.display_name || "Location Not Specified"}
                </span>
              </div>

              <div className="flex items-center text-gray-600 mb-1">
                <FiClock className="mr-2" />
                <span>{job.contract_time || "Full-time"}</span>
              </div>

              {job.salary_min && job.salary_max && (
                <div className="flex items-center text-gray-600 mb-1">
                  <FiDollarSign className="mr-2" />
                  <span>
                    {job.salary_min} - {job.salary_max} {job.currency || ""}
                  </span>
                </div>
              )}

              <p className="text-gray-600 mb-3 line-clamp-3">
                {job.description || "No description provided."}
              </p>

              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                View Job
              </a>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-xl mt-6">
            No jobs found. Try searching for something else.
          </p>
        )
      )}
    </div>
  );
};

export default JobList;
