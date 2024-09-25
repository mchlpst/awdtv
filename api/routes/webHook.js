const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const VERIFY_TOKEN = process.env.WEBHOOK_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  console.log(req.query);

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(res);
  } else {
    res.sendStatus(403);
  }
});

router.post("/", (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach((entry) => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      // Do your magic here!
      // Maybe send a witty response?
      // Update your database?
      // The world is your oyster!
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});
module.exports = router;
