const express = require("express");
const sendEmailRouter = express.Router();
const nodemailer = require("nodemailer");
const { createPDF } = require("../../controllers/CreatePDF");
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
    : console.log(`Send messages: ${succes}`);
});

sendEmailRouter.post("/", async (req, res, next) => {
  const messageOwner = {
    from: "Website AWDTV <noreply@awdtv.nl>",
    to: "secretariaat@awdtv.nl",
    // to: "michael@weareonetribe.nl",
    subject: "Nieuw contactformulier",

    html: `
  	<h1>Nieuw Bericht</h1>
    <p>Naam: ${req.body.firstName} ${req.body.lastName}</p>
    <p>Telefoon: ${req.body.phone}</p>
    <p>Email: ${req.body.email}</p>
  	<p>Bericht:<br/> <em>${req.body.message}</em></p>
  	`,
  };
  const messageSender = {
    from: "AW.DTV <noreply@awdtv.nl>",
    to: req.body.email,
    subject: "Je bericht is goed aangekomen.",
    html: `
		<h1>Geluk!</h1>
		<p>We hebben je bericht in goede orde ontvangen. Dit is wat je ons gestuurd hebt:</p>
    <p><em>Naam: ${req.body.firstName} ${req.body.lastName}</em></p>
    <p><em>Telefoon: ${req.body.phone}</em></p>
    <p><em>Email: ${req.body.email}</em></p>
  	<p><em>Bericht:<br/> ${req.body.message}</em></p>
    <br/>
    <br/>
    <p>Als er iets niet klopt vul het contact formulier dan opnieuw in.</p>
		`,
  };

  Promise.all([
    transporter.sendMail(messageOwner),
    transporter.sendMail(messageSender),
  ])
    .then(res.status(200).json({ emailSend: true }))
    .catch((err) => res.status(err.status || 500));
});
module.exports = sendEmailRouter;
