const express = require("express");
const router = express.Router({ mergeParams: true });
const axios = require("axios");
const cache = require("../../../modules/cache");
const { CustomError, NotFoundError } = require("../../../modules/error");
require("dotenv").config();

const host =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:1337"
    : "https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com";

const apiHeaders = {
  "Content-Type": "application/json",
  Accept: "*/*",
  Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
};

router.get("/", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const page = await checkCache(slug);
    const pageData = createResponse(page);
    cache.set(slug, page);
    res.status(200).json(pageData);
  } catch (error) {
    next(error);
  }
});

router.post("/verify-password", async (req, res, next) => {
  try {
    const providedPassword = req.body.password;
    const { slug } = req.params;
    if (!providedPassword) {
      throw new CustomError("No password provided", 400);
    }

    const page = await checkCache(slug);

    if (
      !page.attributes.Password ||
      page.attributes.Password === providedPassword
    ) {
      return res.status(200).json(createResponse(page, true));
    } else {
      return res.status(200).json({ correctPassword: false });
    }
  } catch (error) {
    next(error);
  }
});

const checkCache = async (slug) => {
  const cachedData = cache.get(slug);
  return cachedData ? cachedData : await getStrapiData(slug);
};

const fetchPages = async (slug) => {
  const response = await axios.get(
    `${host}/api/pages?filters[Slug][$eq]=/${slug}`,
    { headers: apiHeaders }
  );
  return response.data.data;
};

const hasPassword = (page) => {
  const { Password } = page.attributes;
  return Password !== null;
};

const createResponse = (page, validPassword = false) =>
  validPassword
    ? { content: page, passwordNeeded: false }
    : {
        content: hasPassword(page) ? null : page,
        passwordNeeded: hasPassword(page),
      };

async function getStrapiData(slug) {
  const allPages = await fetchPages(slug);
  const page = allPages.find((page) => page.attributes.Slug === `/${slug}`);
  if (!page) {
    throw new NotFoundError("No page found");
  }
  return page;
}

module.exports = router;
