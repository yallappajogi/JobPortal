import React, { useState } from "react";
import axios from "axios";

const ProfileForm = () => {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/profile",
        { bio, location, skills: skills.split(",") },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Create/Update Profile</h2>
      <div className="mb-4">
        <label className="block mb-1">Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Skills (comma-separated):</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Profile
      </button>
    </form>
  );
};

export default ProfileForm;
