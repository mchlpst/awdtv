const express = require("express");
const WPAPI = require("wpapi");

const PORT = process.env.PORT || 3001;
const wp = new WPAPI({ endpoint: "https://www.awdtv.nl/wp-json" });

const app = express();

// app.use("/posts", require("./routes/posts.js"));

app.get("/posts", (req, res, next) => {
  wp.posts()
    .get()
    .then((data) => {
      res.status(200).json({ posts: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ posts: null });
    });
});

app.get("/pages", (req, res, next) => {
  wp.pages()
    .get()
    .then((data) => {
      res.status(200).json({ pages: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ pages: null });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
