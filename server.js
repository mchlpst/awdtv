const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/client/build"));
const route = express.Router();
const port = process.env.PORT || 8080;

// POST email contact
app.use("/new-member", require("./routes/newMember"));
app.use("/custom-form", require("./routes/sendCustomForm"));
app.use("/send-contact-form", require("./routes/sendContactForm"));

app.get("/webhook", (req, res) => {
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

app.post("/webhook", (req, res) => {
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
