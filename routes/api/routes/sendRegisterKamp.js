const express = require("express");
const sendEmailRouter = express.Router();
const nodemailer = require("nodemailer");

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
    : console.log(`Send register kamp: ${succes}`);
});

sendEmailRouter.post("/", async (req, res, next) => {
  const messageOwner = {
    from: "Website AWDTV <noreply@awdtv.nl>",
    // to: "kamp@awdtv.nl",
    to: "michael@weareonetribe.nl",
    subject: "Aanmelding AW.DTV kamp 2025",
    html: `
    <h1>Aanmelding Kamp</h1>
    <p>Hallo commissie,<br/><br/>Er is een nieuwe aanmelding voor het kamp hieronder zijn de gegevens.</p>
    <table border="0">
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Naam</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.firstName} ${req.body.lastName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Leeftijd</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.age}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Team</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.team}</td>
      </tr>
      <tr>
        <td style="padding: 10px 15px; border: 1px solid black;">Telefoonnummer (van ouder/verzorger)</td>
        <td style="padding: 10px 15px; border: 1px solid black;">${req.body.phone}</td>
      </tr>
    </table>

   <p> Met vriendelijke groet,<br>Website AW.DTV</p>
    `,
  };
  Promise.all([transporter.sendMail(messageOwner)])
    .then(res.status(200).json({ emailSend: true }))
    .catch((err) => res.status(err.status || 500));
});
module.exports = sendEmailRouter;
