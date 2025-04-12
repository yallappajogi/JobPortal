import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data); // Store the profile data in state
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Error fetching profile. Try again."
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Profile
        </h2>
        {errorMessage && (
          <div className="text-red-600 mb-4">{errorMessage}</div>
        )}
        {profile ? (
          <div>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Message:</strong> {profile.message}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
