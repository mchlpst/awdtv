import React, { useState, useContext, useEffect } from "react";
import { DatoContext } from "../../hooks/datoCMS";

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
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.allArticles);
    }
  }, [context]);
  useEffect(() => {
    if (data) {
      const all = data.map((item) => item.tag);
      setTags(
        all.filter((value, index, self) => self.indexOf(value) === index)
      );
    }
  }, [data]);

  const replaceDash = (word) => {
    return word.replace(/-/g, " ");
  };

  useEffect(() => {
    if (activeTags.length === 0) {
      setFilteredItems(data);
    } else {
      setFilteredItems(data.filter((item) => activeTags.includes(item.tag)));
    }
  }, [activeTags, data]);

  useEffect(() => {
    console.log(activeTags);
  }, [activeTags]);

  const handleFilter = (tag) => {
    console.log(activeTags);
    if (activeTags.includes(tag)) {
      setActiveTags((current) => current.filter((tags) => tags != tag));
    } else {
      setActiveTags((current) => [...current, tag]);
    }
  };
  return (
    <main className="news">
      <Hero title="Nieuws" maxHeight />
      <section className="news__wrapper">
        <Grid>
          <Column col={12}>
            <div className="news__tags-container">
              {tags.map((tag) => (
                <div
                  className={`news__tag ${
                    activeTags.includes(tag) ? "news__tag--active" : ""
                  }`}
                  onClick={() => handleFilter(tag)}>
                  {replaceDash(tag)}
                </div>
              ))}
            </div>
          </Column>
        </Grid>
        <Grid>
          <Column col={12}>
            <div className="news__card-wrapper">
              {filteredItems &&
                filteredItems.map((article) => (
                  <div className="news__card-container">
                    <Link to={article.slug} className="news__card-link">
                      <div className="news__card">
                        <div className="news__card-content">
                          <p className="news__card-date">{article.date}</p>
                          <h2 className="news__card-title">{article.title}</h2>
                        </div>
                        <img
                          className="news__card-background"
                          srcSet={article.visual.responsiveImage.srcSet}
                          alt={article.visual.responsiveImage.alt}
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
