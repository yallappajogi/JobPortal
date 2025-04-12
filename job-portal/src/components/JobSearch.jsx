import React, { useState } from "react";

const JobSearch = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery); // Trigger the search in parent component
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border px-3 py-2 mr-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-sm"
      >
        Search
      </button>
    </form>
  );
};

export default JobSearch;
