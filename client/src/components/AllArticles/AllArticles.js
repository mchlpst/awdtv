import React, { useState, useContext, useEffect } from "react";
import { DatoContext } from "../../hooks/datoCMS";
import { Link } from "react-router-dom";

import Button from "../Button/Button";

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
    if (activeFilter === tag) {
      setActiveFilter(null);
    } else {
      setActiveFilter(tag);
    }
  };

  return (
    <section className="all-articles">
      {data && (
        <div className="all-articles__article-container">
          {filteredArticles.map((article, index) => {
            return (
              <>
                {index <= 3 && (
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
                )}
              </>
            );
          })}
          <div className="all-articles__button-container">
            <Button type="solid" to={"/nieuws"} text="Toon meer" />
          </div>
        </div>
      )}
    </section>
  );
};
export default AllArticles;
