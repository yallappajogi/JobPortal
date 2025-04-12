import React, { useEffect, useState } from "react";

const MyJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/my-job", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("🟢 Fetched Jobs:", data);
        setSavedJobs(data);
      })
      .catch((err) => console.error("Error fetching saved jobs:", err));
  }, []);

  const filteredJobs = savedJobs.filter((job) => {
    const title = job.title ? job.title.toLowerCase() : "";
    const company = job.company ? job.company.toLowerCase() : "";
    const location = job.location ? job.location.toLowerCase() : "";
    const search = searchTerm.toLowerCase();

    return (
      title.includes(search) ||
      company.includes(search) ||
      location.includes(search)
    );
  });

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4 text-center">My Saved Jobs</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded-md w-full mb-4 shadow-sm"
      />

      {/* Jobs List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between p-3 border rounded-md shadow-sm bg-white"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {job.title || "No title"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {job.companyName || "Unknown company"}
                </p>
                <p className="text-gray-500 text-xs">
                  {job.location || "Location not specified"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
