const express = require("express");
const sendEmailRouter = express.Router();
const nodemailer = require("nodemailer");
const { createPDF } = require("../../../controllers/CreatePDF");
const fs = require("fs");

// Connect to Email server
const transporter = nodemailer.createTransport({
  host: "mail230.sohosted.com",
  port: 465,
  secure: true,
  auth: {
    user: "noreply@awdtv.nl",
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err, succes) => {
  err
    ? console.log("validatie mislukt: " + err)
    : console.log(`Send new member: ${succes}`);
});

sendEmailRouter.post("/", async (req, res, next) => {
  const file = req.body;
  await createPDF(file);

  const messageOwner = {
    from: "Website AWDTV <noreply@awdtv.nl>",
    to: "secretariaat@awdtv.nl",
    // to: "michael@weareonetribe.nl",
    subject: "Nieuw lidmaatschap",
    attachments: {
      path: `./PDF/${req.body.firstName}-${req.body.lastName}.pdf`,
    },
    html: `
  	<h1>Nieuw lidmaatschap</h1>
  	<p>Hallo Dames van het secretariaat. Er is een nieuwe aanmelding gedaan op de website. Zie de bijlage.</p>
  	`,
  };

  Promise.all([transporter.sendMail(messageOwner)])
    .then(res.status(200).json({ emailSend: true }))
    .catch((err) => res.status(err.status || 500));
});
module.exports = sendEmailRouter;
