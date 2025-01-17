const express = require("express");
const axios = require("axios");
require("dotenv").config();

async function getSportLinkVolenteer(volenteerId) {
  try {
    const response = await axios.get(
      `https://data.sportlink.com/vrijwilligers?client_id=${process.env.SPORTLINK_ID}&vrijwilligerstaakcode=${volenteerId}&aantaldagen=200`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return new Error("Error fetching data");
  }
}

exports.getSportLinkVolenteer = getSportLinkVolenteer;
