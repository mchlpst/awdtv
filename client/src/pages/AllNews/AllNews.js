import React, { useState, useEffect } from "react";

import Hero from "../../components/Hero/Hero";

import "./AllNews.scss";
import { Link } from "react-router-dom";
import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";

const AllNews = () => {
  const [data, setData] = useState(null);
  const [activeTags, setActiveTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetch(
      `https://awdtv-cms-8c73f71b0b4d.herokuapp.com/api/articles?sort=Data:desc&populate[0]=Visual&pagination[page]=1&pagination[pageSize]=30`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);
  useEffect(() => {
    if (data) {
      const all = data
        .map((item) => item.attributes.Tag)
        .filter((item) => !!item);
      setTags(
        all.filter((value, index, self) => self.indexOf(value) === index)
      );
    }
  }, [data]);

  useEffect(() => {
    if (activeTags.length === 0) {
      setFilteredItems(data);
    } else {
      setFilteredItems(
        data.filter((item) => activeTags.includes(item.attributes.Tag))
      );
    }
  }, [activeTags, data]);

  const handleFilter = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags((current) => current.filter((tags) => tags !== tag));
    } else {
      setActiveTags((current) => [...current, tag]);
    }
  };
  console.log(tags);
  return (
    <main className="news">
      <Hero title="Nieuws" maxHeight />
      <section className="news__wrapper">
        <Grid>
          <Column col={12}>
            <div className="news__tags-container">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className={`news__tag ${
                    activeTags.includes(tag) ? "news__tag--active" : ""
                  }`}
                  onClick={() => handleFilter(tag)}>
                  {tag}
                </div>
              ))}
            </div>
          </Column>
        </Grid>
        <Grid>
          <Column col={12}>
            <div className="news__card-wrapper">
              {filteredItems &&
                filteredItems.map((article, index) => (
                  <div className="news__card-container" key={index}>
                    <Link
                      to={article.attributes.Slug}
                      className="news__card-link">
                      <div className="news__card">
                        <div className="news__card-content">
                          <p className="news__card-date">
                            {article.attributes.Data}
                          </p>
                          <h2 className="news__card-title">
                            {article.attributes.Title}
                          </h2>
                        </div>
                        <img
                          className="news__card-background"
                          src={
                            article.attributes.Visual.data
                              ? article.attributes.Visual.data.attributes.url
                              : "/img/background-fallback.jpeg"
                          }
                          alt={
                            article.attributes.Visual.data
                              ? article.attributes.Visual.data.attributes
                                  .alternativeText
                              : "Een wedstrijd van AW.DTV op het veld van AW.DTV"
                          }
                        />
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </Column>
        </Grid>
      </section>
    </main>
  );
};
export default AllNews;
