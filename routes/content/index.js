const express = require("express");
const router = express.Router();

router.use("/volenteers", require("./route/getVolenteerTasks"));
router.use("/pages/:slug", require("./route/getPages"));

module.exports = router;
