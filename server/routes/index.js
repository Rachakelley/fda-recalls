const express = require("express");
const router = express.Router();
const axios = require("axios");

// Constants
const FDA_API_URL = "https://api.fda.gov/food/enforcement.json";
const FDA_API_QUERY =
  'search=report_date:[20250101+TO+20250114]+AND+country.exact:"United+States"&limit=5';

router.get("/test", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

router.get("/recalls", async (req, res) => {
  try {
    console.log("Fetching FDA recalls data...");
    const response = await axios.get(`${FDA_API_URL}?${FDA_API_QUERY}`);
    console.log("FDA API request successful");
    res.json(response.data);
  } catch (error) {
    console.error("FDA API Error:", error.message);
    res.status(500).json({
      error: "Error fetching FDA data",
      details: error.message,
    });
  }
});

module.exports = router;
