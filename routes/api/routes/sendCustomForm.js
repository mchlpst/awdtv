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
    : console.log(`Send custom form: ${succes}`);
});

sendEmailRouter.post("/", async (req, res, next) => {
  const messageOwner = {
    from: "Website AWDTV <noreply@awdtv.nl>",
    to: "schoolkorfbal@awdtv.nl",
    // to: "michael@weareonetribe.nl",
    subject: "Aanmelding schoolkorfbal 2024",
    html: `
  	<h1>Aanmelding Schoolkorfbal</h1>
  	<p>Hallo Jet,<br/><br/>Er is een nieuwe aanmelding voor schoolkorbal hieronder zijn de gegevens.</p>
    <table border="0">
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Geslacht</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.gender}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Naam</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.firstName} ${req.body.lastName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Telefoonnummer</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.phone}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Email</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.email}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Telefoonnummer</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.phone}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">School</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.school}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Groep</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.group}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Naam ouder</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.parent}</td>
      </tr>
    </table>

   <p> Met vriendelijke groet,<br>Website AW.DTV</p>
  	`,
  };
  const messageSender = {
    from: "AW.DTV <noreply@awdtv.nl>",
    to: req.body.email,
    subject: "Je bericht is goed aangekomen.",
    html: `
		<h1>Geluk!</h1>
		<p>We hebben je bericht in goede orde ontvangen. Dit is wat je ons gestuurd hebt:</p>
    <table border="0">
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Geslacht</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.gender}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Naam</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.firstName} ${req.body.lastName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Telefoonnummer</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.phone}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Email</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.email}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Telefoonnummer</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.phone}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">School</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.school}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Groep</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.group}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Naam ouder</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.parent}</td>
      </tr>
    </table>
    <p>Als er iets niet klopt vul het contact formulier dan opnieuw in.</p>
    <p> Met vriendelijke groet,<br>Website AW.DTV</p>
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
