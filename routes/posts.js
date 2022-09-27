const express = require("express");
const postsRouter = express.Router();
const axios = require("axios");

postsRouter.get("", async (req, res, next) => {
  try {
    const postsAPI = await axios.get(`http://awdtv.nl/wp-json/wp/v2/posts`);
    res.render("posts", { posts: postsAPI.data });
  } catch (err) {
    if (err.response) {
      res.render("posts", { posts: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
  }
});
module.exports = postsRouter;
