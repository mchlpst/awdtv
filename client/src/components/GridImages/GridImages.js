import React, { useState, useEffect } from "react";

import "./GridImages.scss";

const GridImages = (props) => {
  const content = props.data;
  console.log(content);

  return (
    <section className="grid-images">
      <div className="grid-images__tile-container grid-images__tile-container--main">
        <div className="grid-images__tile-image">
          <img
            src={
              content.Image1.data
                ? `http://localhost:1337${content.Image1.data.attributes.url}`
                : `http://localhost:1337${content.Articles.data[0].attributes.Image.data.attributes.url}`
            }
            alt={
              content.Image1.data
                ? content.Image1.data.attributes.alternativeText
                : content.Articles.data[0].attributes.Image.data.attributes
                    .alternativeText
            }
          />
          <div className="grid-images__tile-context-container">
            {content.Title1 && !content.Articles.data[0] && (
              <h4 className="grid-images__tile-title">{content.Title1}</h4>
            )}
            {!content.Title1 && content.Articles.data[0] && (
              <h4 className="grid-images__tile-title">
                {content.Articles.data[0].attributes.Title}
              </h4>
            )}
          </div>
        </div>
      </div>
      <div className="grid-images__tile-container grid-images__tile-container--second">
        <div className="grid-images__tile-image">
          <img
            src={
              content.Image2.data
                ? `http://localhost:1337${content.Image2.data.attributes.url}`
                : `http://localhost:1337${content.Articles.data[1].attributes.Image.data.attributes.url}`
            }
            alt={
              content.Image2.data
                ? content.Image2.data.attributes.alternativeText
                : content.Articles.data[1].attributes.Image.data.attributes
                    .alternativeText
            }
          />
        </div>
        <div className="grid-images__tile-context-container">
          {content.Title2 && !content.Articles.data[1] && (
            <h4 className="grid-images__tile-title">{content.Title2}</h4>
          )}
          {!content.Title2 && content.Articles.data[1] && (
            <h4 className="grid-images__tile-title">
              {content.Articles.data[1].attributes.Title}
            </h4>
          )}
        </div>
      </div>
      <div className="grid-images__tile-container grid-images__tile-container--third"></div>
    </section>
  );
};
export default GridImages;
