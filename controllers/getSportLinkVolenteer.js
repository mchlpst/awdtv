const express = require("express");
const axios = require("axios");
require("dotenv").config();

async function getSportLinkVolenteer(volenteerId) {
  try {
    const response = await axios.get(
      `https://data.sportlink.com/vrijwilligers?client_id=QEG62mGcVQ&vrijwilligerstaakcode=${volenteerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    console.log("sportlink:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return new Error("Error fetching data");
  }
}

exports.getSportLinkVolenteer = getSportLinkVolenteer;
