const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/client/build"));
const route = express.Router();
const port = process.env.PORT || 8080;

app.use("/api", require("./routes/api"));
app.use("/sportlink", require("./routes/sportlink"));
app.use("/content", require("./routes/content"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
