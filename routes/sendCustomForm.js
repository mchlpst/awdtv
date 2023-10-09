const express = require("express");
const sendEmailRouter = express.Router();
const nodemailer = require("nodemailer");
const { createPDF } = require("../controllers/CreatePDF");
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
    // to: "schoolkorfbal@awdtv.nl",
    to: "michael@weareonetribe.nl",
    subject: "Aanmelding schoolkorfbal 2023",
    html: `
  	<h1>Aanmelding Schoolkorfbal</h1>
  	<p>Hallo Jet,<br/><br/>Er is een nieuwe aanmelding voor schoolkorbal hieronder zijn de gegevens.</p>
    <table border="0" style="border: 1px solid black;" cellspacing="15" cellpadding="15>
      <tr>
        <td>Geslacht</td>
        <td>${req.body.gender}</td>
      </tr>
      <tr>
        <td>Naam</td>
        <td>${req.body.firstName} ${req.body.lastName}</td>
      </tr>
      <tr>
        <td>Telefoonnummer</td>
        <td>${req.body.phone}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>${req.body.email}</td>
      </tr>
      <tr>
        <td>Telefoonnummer</td>
        <td>${req.body.phone}</td>
      </tr>
      <tr>
        <td>School</td>
        <td>${req.body.school}</td>
      </tr>
      <tr>
        <td>Groep</td>
        <td>${req.body.group}</td>
      </tr>
      <tr>
        <td>Naam ouder</td>
        <td>${req.body.parent}</td>
      </tr>
    </table>

    Met vriendelijke groet,<br>Website AW.DTV
  	`,
  };

  Promise.all([transporter.sendMail(messageOwner)])
    .then(res.status(200).json({ emailSend: true }))
    .catch((err) => res.status(err.status || 500));
});
module.exports = sendEmailRouter;
