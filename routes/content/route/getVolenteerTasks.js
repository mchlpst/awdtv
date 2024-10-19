const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
  getSportLinkVolenteer,
} = require("../../../controllers/getSportLinkVolenteer");
const {
  createMonthsWithEventsCalendar,
} = require("../../../controllers/createCalendar");
require("dotenv").config();

const host =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:1337"
    : "https://awdtv-cms-8c73f71b0b4d.herokuapp.com";

router.get("/", async (req, res) => {
  const getStrapiData = async () => {
    try {
      const response = await axios.get(`${host}/api/vrijwilligerstaaks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      });
      const res = response.data.data;
      const transformedResponse = [];
      if (res) {
        res.forEach((item) => {
          const dateFrom = new Date(item.attributes.DateFrom);
          const dateTill = new Date(item.attributes.DateTill);
          const newItem = {
            id: item.id,
            type: item.attributes.Type,
            date: dateFrom.toISOString().split("T")[0],
            description: item.attributes.Description,
            timeFrom: dateFrom.toLocaleTimeString("nl-NL", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            timeTill: dateTill.toLocaleTimeString("nl-NL", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
          };
          transformedResponse.push(newItem);
        });
      }
      return transformedResponse;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
  const strapiData = await getStrapiData();
  const year = createMonthsWithEventsCalendar(strapiData);

  let sportLinkData = [];
  // strapiData.forEach(async (task) => {
  //   switch (task.attributes.Type) {
  //     case "Scheidsrechtersdienst":
  //       sportLinkData = [...(await getSportLinkVolenteer(22))];
  //   }
  // });
  // console.log(sportLinkData);
  return res.json(year);
});

module.exports = router;
