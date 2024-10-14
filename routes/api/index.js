const express = require("express");
const router = express.Router();

// POST email contact
router.use("/new-member", require("./routes/newMember"));
router.use("/custom-form", require("./routes/sendCustomForm"));
router.use("/send-contact-form", require("./routes/sendContactForm"));
router.use("/webhook", require("./routes/webHook"));
router.use("/instagram-posts", require("./routes/instagramPosts"));

module.exports = router;
