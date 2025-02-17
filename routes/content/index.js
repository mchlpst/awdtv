const express = require("express");
const router = express.Router();

router.use("/volenteers", require("./route/getVolenteerTasks"));
router.use("/pages/:slug", require("./route/getPages"));
router.use("/all-calendars", require("./route/getCalendars"));

module.exports = router;
