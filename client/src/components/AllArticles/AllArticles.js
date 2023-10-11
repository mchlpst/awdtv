import React, { useState, useContext, useEffect } from "react";
import { DatoContext } from "../../hooks/datoCMS";
import { Link } from "react-router-dom";

import Button from "../Button/Button";

import "./AllArticles.scss";

const AllArticles = () => {
  const [data, setData] = useState(null);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.allArticles);
      setFilteredArticles(context.allArticles);
    }
  }, [context]);

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
                        srcSet={
                          article.visual
                            ? article.visual.responsiveImage.srcSet
                            : "/img/background-fallback.jpeg"
                        }
                        className="all-articles__article-image"
                        alt={
                          article.visual
                            ? article.visual.responsiveImage.alt
                            : "Een wedstrijd van AW.DTV op het veld van AW.DTV"
                        }
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
