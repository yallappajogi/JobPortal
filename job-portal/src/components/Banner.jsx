import React, { useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

const Banner = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setQuery(value);
    else if (name === "location") setLocation(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, location);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14">
      <h1 className="text-5xl font-bold mb-3">
        <span className="text-blue">Find Your </span>{" "}
        <span className="text-black">New Job Today!</span>
      </h1>

      <p className="text-lg text-black/70 mb-8">
        Thousands of jobs in the computer, engineering, and technology sectors
        are waiting for you!
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-start md:gap-5 gap-1">
          <div className="relative flex items-center w-full md:w-1/2">
            <FiSearch className="absolute ml-3 text-gray-400" />
            <input
              type="text"
              name="title"
              placeholder="Enter job title"
              className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={query}
              onChange={handleInputChange}
            />
          </div>

          <div className="relative flex items-center w-full md:w-1/4">
            <FiMapPin className="absolute ml-3 text-gray-400" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={location}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-2 text-white bg-blue rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <FiSearch /> Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
