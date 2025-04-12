import React from "react";
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiBookmark,
} from "react-icons/fi";

const Carrd = ({ data }) => {
  const {
    company,
    title,
    location,
    salary_min,
    salary_max,
    salary_is_predicted,
    contract_type,
    created,
    description,
    redirect_url,
  } = data;

  const handleSaveJob = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please login to save jobs.");
      return;
    }

    console.log("Token being sent:", token);

    fetch("http://localhost:5000/api/my-job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userId: user.id,
        job: {
          title,
          company: company.display_name || company,
          location: location.display_name || location,
          salary_min: isNaN(Number(salary_min)) ? null : Number(salary_min),
          salary_max: isNaN(Number(salary_max)) ? null : Number(salary_max),
          contract_type,
          description,
          redirect_url,
        },
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message === "Job saved successfully") {
          alert("Job saved successfully!");
        } else {
          alert("Failed to save the job.");
        }
      })
      .catch((error) => console.error("Error saving job:", error));
  };

  return (
    <section className="card mb-4 p-4 border border-gray-200 rounded-lg shadow-sm relative">
      <button
        onClick={handleSaveJob}
        className="absolute top-2 right-2 text-primary/70 hover:text-primary"
        title="Save"
      >
        <FiBookmark size={20} />
      </button>

      <a
        href={redirect_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-4 flex-col sm:flex-row items-start"
      >
        <div>
          <h4 className="text-primary mb-1">
            {company?.display_name || "Unknown Company"}
          </h4>
          <h3 className="text-lg font-semibold mb-2">
            {title || "No Title Provided"}
          </h3>
          <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
            <span className="flex items-center gap-2">
              <FiMapPin />
              {location?.display_name || "Location not specified"}
            </span>
            <span className="flex items-center gap-2">
              <FiClock />
              {contract_type || "Not specified"}
            </span>
            <span className="flex items-center gap-2">
              <FiDollarSign />
              {salary_min && salary_max
                ? `${salary_min} - ${salary_max} (Predicted: ${
                    salary_is_predicted === "1" ? "Yes" : "No"
                  })`
                : "Salary not specified"}
            </span>
            <span className="flex items-center gap-2">
              <FiCalendar />
              {created
                ? new Date(created).toLocaleDateString()
                : "Date not available"}
            </span>
          </div>
          <p className="text-base text-primary/70">
            {description
              ? description.slice(0, 150)
              : "No description provided"}
            ...
          </p>
        </div>
      </a>
    </section>
  );
};

export default Carrd;
