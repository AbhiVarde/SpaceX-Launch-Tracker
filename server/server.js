const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Define a route to retrieve the launch data
app.get("/api/launch", (req, res) => {
  axios
    .get("https://api.spacexdata.com/v4/launches/latest")
    .then((response) => {
      const launch = {
        name: response.data.name,
        flight_number: response.data.flight_number,
        date_utc: response.data.date_utc,
        details: response.data.details,
        success: response.data.success,
      };
      res.json(launch);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch launch data" });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
