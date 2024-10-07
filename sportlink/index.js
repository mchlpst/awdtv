const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// fijn dat het zo werkt, maar dit is niet handig. Ik wil dat de complete objecten terug krijgen die ik meteen
// kan implementeren in de code. Dus we gaan het herschrijven.

router.get("/:endpoint", async (req, res) => {
  const endpoint = req.params.endpoint;
  try {
    const response = await axios.get(`https://data.sportlink.com/${endpoint}`, {
      params: {
        client_id: process.env.SPORTLINK_ID,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching sportlink data:", error.message);
    res.status(500).json({ error: "Failed to fetch sportlink data" });
  }
});
module.exports = router;
