import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Carrd from "../components/Carrd";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";
import { fetchAdzunaJobs } from "../api/adzuna";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const itemsPerPage = 4;

  // Fetch local jobs and API jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // Fetch posted jobs from MongoDB
        const localRes = await fetch("http://localhost:5000/api/posted-Jobs");
        if (!localRes.ok) throw new Error("Failed to fetch local jobs");
        const localJobs = await localRes.json();

        // Fetch saved jobs separately if needed
        // const savedJobsRes = await fetch("http://localhost:5000/api/saved-jobs");
        // const savedJobs = await savedJobsRes.json();

        // Format local jobs
        const formattedLocalJobs = localJobs.map((job) => ({
          id: job._id,
          company: { display_name: job.companyName || "Unknown" },
          title: job.jobTitle || "No title provided",
          location: { display_name: job.location || "Location not specified" },
          salary_min: job.salary_min || "N/A",
          salary_max: job.salary_max || "N/A",
          salary_is_predicted: "0",
          contract_type: job.contractType || "Not specified",
          created: job.createdAt || new Date().toISOString(),
          description: job.description || "No description available",
          redirect_url: "#", // No external link for local jobs
        }));

        // Fetch jobs from Adzuna API
        const apiJobs = await fetchAdzunaJobs(query, location);

        // Format Adzuna API jobs
        const formattedApiJobs = apiJobs.map((job) => ({
          id: job.id,
          company: { display_name: job.company?.display_name || "Unknown" },
          title: job.title || "No title provided",
          location: {
            display_name:
              job.location?.display_name || "Location not specified",
          },
          salary_min: job.salary_min || "N/A",
          salary_max: job.salary_max || "N/A",
          salary_is_predicted: job.salary_is_predicted || "0",
          contract_type: job.contract_type || "Not specified",
          created: job.created || new Date().toISOString(),
          description: job.description || "No description provided",
          redirect_url: job.redirect_url || "#",
        }));

        // Combine MongoDB jobs and API jobs
        setJobs([...formattedLocalJobs, ...formattedApiJobs]);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [query, location]);

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs.filter(
      (job) =>
        job.jobTitle?.toLowerCase().includes(query.toLowerCase()) ||
        job.title?.toLowerCase().includes(query.toLowerCase())
    );

    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({ location, contract_type, salary_min, salary_max }) =>
          location?.display_name?.toLowerCase() === selected.toLowerCase() ||
          contract_type?.toLowerCase() === selected.toLowerCase() ||
          parseInt(salary_min) <= parseInt(selected) ||
          parseInt(salary_max) <= parseInt(selected)
      );
    }

    return filteredJobs;
  };

  const handleSearch = (query, location) => {
    setQuery(query);
    setLocation(location);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const paginatedJobs = filteredData(jobs, selectedCategory, query);
  const totalPages = Math.ceil(paginatedJobs.length / itemsPerPage);
  const displayedJobs = paginatedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Banner onSearch={handleSearch} />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleCategoryChange} />
        </div>
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : displayedJobs.length > 0 ? (
            <>
              {displayedJobs.map((job, index) => (
                <Carrd key={index} data={job} />
              ))}
              <h3 className="text-lg font-bold mb-2">
                {paginatedJobs.length} Jobs Found
              </h3>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">0 Jobs</h3>
              <p>No data found</p>
            </>
          )}
          {paginatedJobs.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={prevPage}>Previous</button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={nextPage}>Next</button>
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
