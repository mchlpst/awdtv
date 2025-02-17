const express = require("express");
const router = express.Router({ mergeParams: true });
const axios = require("axios");
const cache = require("../../../modules/cache");
const { CustomError, NotFoundError } = require("../../../modules/error");
require("dotenv").config();

router.get("/", async (req, res, next) => {
  try {
    const allCalendars = await checkCache();
    cache.set("allCalendars", allCalendars);
    res.status(200).json(allCalendars);
  } catch (error) {
    next(error);
  }
});

const host =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:1337"
    : "https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com";

const apiHeaders = {
  "Content-Type": "application/json",
  Accept: "*/*",
  Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
};

const checkCache = async () => {
  const cachedData = cache.get("allCalendars");
  return cachedData ? cachedData : await getAllCalendars();
};

const getAllCalendars = async () => {
  const response = await axios.get(
    `${host}/api/calendars?sort=EventDate&populate[Page][fields][0]=Title&populate[Page][fields][1]=Slug&populate[Article][fields][2]=Title&populate[Article][fields][3]=Slug`,
    {
      headers: apiHeaders,
    }
  );
  const allData = response.data.data;
  const now = new Date();
  const futureData = allData.filter(
    (item) => new Date(item.attributes.EventDate) > now
  );

  return futureData;
};
module.exports = router;
