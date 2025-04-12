// src/api/adzuna.js

export const fetchAdzunaJobs = async (query = "", location = "") => {
  const APP_ID = "282a44a4";
  const APP_KEY = "8f1771d596ba03f3f974d0940aa43553";
  const API_URL = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=20&what=${query}&where=${location}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Failed to fetch jobs from Adzuna:", error);
    return [];
  }
};
