const express = require("express");
const router = express.Router();

router.use("/volenteers", require("./route/getVolenteerTasks"));

module.exports = router;
