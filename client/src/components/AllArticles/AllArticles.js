import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "../Button/Button";

import "./AllArticles.scss";

const AllArticles = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      `https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com/api/articles?sort=Data:desc&populate[0]=Visual&pagination[page]=1&pagination[pageSize]=4`,
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

  return (
    <section className="all-articles">
      {data && (
        <div className="all-articles__article-container">
          {data.map((article, index) => {
            return (
              index <= 3 && (
                <article className="all-articles__article" key={index}>
                  <Link
                    to={article.attributes.Slug}
                    className="all-articles__link">
                    <img
                      src={
                        article.attributes.Visual.data
                          ? article.attributes.Visual.data.attributes.url
                          : "/img/background-fallback.jpeg"
                      }
                      className="all-articles__article-image"
                      alt={
                        article.visual
                          ? article.attributes.Visual.data.attributes
                              .alternativeText
                          : "Een wedstrijd van AW.DTV op het veld van AW.DTV"
                      }
                    />
                    <div className="all-articles__text-container">
                      <h4 className="all-articles__title">
                        {article.attributes.Title}
                      </h4>
                      <p className="all-articles__date">
                        {article.attributes.Data}
                      </p>
                    </div>
                  </Link>
                </article>
              )
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
