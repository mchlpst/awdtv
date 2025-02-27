const express = require("express");
const router = express.Router();
const axios = require("axios");
const { DateTime } = require("luxon");

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
    : "https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com";

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
          const dateFrom = DateTime.fromISO(item.attributes.DateFrom, {
            zone: "utc",
          });
          const dateTill = DateTime.fromISO(item.attributes.DateTill, {
            zone: "utc",
          });

          const newItem = {
            id: item.id,
            type: item.attributes.Type,
            date: dateFrom.toISODate(), // ISO Date in YYYY-MM-DD format
            description: item.attributes.Description,
            person: null,
            timeFrom: dateFrom.setZone("Europe/Amsterdam").toFormat("HH:mm"), // Consistent in "nl-NL" timezone
            timeTill: dateTill.setZone("Europe/Amsterdam").toFormat("HH:mm"), // Consistent in "nl-NL" timezone
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

  async function processTask(task, volunteerType, isSameEvent) {
    const fetchedArray = await getSportLinkVolenteer(volunteerType);

    // Filter matching items
    const matchingItems = fetchedArray.filter(
      (item) =>
        task.date === item.datumvanaf.split("T")[0] &&
        task.timeFrom === item.tijdvanaf &&
        task.timeTill === item.tijdtot
    );

    if (matchingItems.length > 0) {
      if (isSameEvent) {
        // For same event, collect all names in an array
        task.persons = matchingItems.map((item) => item.naam);
      } else {
        // For different events, find the first unused matching item
        const unusedItem = matchingItems.find(
          (item) =>
            !strapiData.some(
              (t) =>
                t.person === item.naam &&
                t.date === task.date &&
                t.timeFrom === task.timeFrom &&
                t.timeTill === task.timeTill
            )
        );

        if (unusedItem) {
          task.person = unusedItem.naam;
        }
      }
    }
  }
  if (strapiData) {
    await Promise.all(
      strapiData.map(async (task) => {
        switch (task.type) {
          case "Scheidsrechtersdienst":
            await processTask(task, 22, false);
            break;
          case "Bardienst-1":
            await processTask(task, 1, false);
            break;
          case "Bardienst-2":
            await processTask(task, 61, true);
            break;
          case "Bardienst-3":
            await processTask(task, 62, true);
            break;
          case "Zaaldienst":
            await processTask(task, 21, false);
            break;
          case "Bardienst-2-pers":
            await processTask(task, 81, true);
            break;
          case "Bardienst-3-pers":
            await processTask(task, 82, true);
            break;
        }
      })
    );
    const year = createMonthsWithEventsCalendar(strapiData);

    return res.json(year);
  } else {
    const year = createMonthsWithEventsCalendar(null);

    return res.json(year);
  }
});

module.exports = router;
