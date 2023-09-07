import React, { useState, useContext, useEffect } from "react";
import { DatoContext } from "../../hooks/datoCMS";
import { Link } from "react-router-dom";

import "./AllArticles.scss";

const AllArticles = () => {
  const [data, setData] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.allArticles);
      setFilteredArticles(context.allArticles);
    }
  }, [context]);
  useEffect(() => {
    let array = [];
    if (data) {
      data.map((item) => {
        if (array.indexOf(item.tag) === -1) {
          array.push(item.tag);
        }
      });
      setFilterOptions(array);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (activeFilter) {
        setFilteredArticles(
          data.filter((article) => article.tag === activeFilter)
        );
      } else {
        setFilteredArticles(data);
      }
    }
  }, [activeFilter]);

  const toggleFilter = (tag) => {
    console.log(activeFilter, tag);
    if (activeFilter === tag) {
      setActiveFilter(null);
    } else {
      setActiveFilter(tag);
    }
  };

  return (
    <section className="all-articles">
      {filterOptions.length > 0 && (
        <div className="all-articles__filter-container">
          <div
            className={`all-articles__filter-item ${
              activeFilter === null ? "all-articles__filter-item--active" : ""
            }`}
            onClick={() => setActiveFilter(null)}>
            Alles
          </div>
          {filterOptions.map((tag) => (
            <div
              className={`all-articles__filter-item ${
                activeFilter === tag ? "all-articles__filter-item--active" : ""
              }`}
              key={tag}
              onClick={() => toggleFilter(tag)}>
              {tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, " ")}
            </div>
          ))}
        </div>
      )}

      {data && (
        <div className="all-articles__article-container">
          {filteredArticles.map((article, index) => {
            return (
              <article className="all-articles__article" key={index}>
                <Link to={article.slug} className="all-articles__link">
                  <img
                    srcSet={article.visual.responsiveImage.srcSet}
                    className="all-articles__article-image"
                    alt={article.visual.responsiveImage.alt}
                  />
                  <div className="all-articles__text-container">
                    <h4 className="all-articles__title">{article.title}</h4>
                    <p className="all-articles__date">{article.date}</p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
export default AllArticles;
