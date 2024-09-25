const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://graph.instagram.com/me/media", {
      params: {
        fields:
          "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username",
        access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
      },
      headers: {
        Authorization: `Bearer ${process.env.INSTAGRAM_ACCESS_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Instagram posts:", error.message);
    res.status(500).json({ error: "Failed to fetch Instagram posts" });
  }
});

module.exports = router;
