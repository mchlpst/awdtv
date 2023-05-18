import React, { useState, useEffect } from "react";

import "./GridImages.scss";
import Button from "../Button/Button";

const GridImages = (props) => {
  const [mainBlock, setMainBlock] = useState(null);
  const [secondairBlock, setSecondairBlock] = useState(null);
  const content = props.data;

  useEffect(() => {
    if (content.articles.length !== 0) {
      setMainBlock({
        title: content.articles[0].title,
        slug: content.articles[0].slug,
        label: "Bekijk artikel",
        src: content.articles[0].visual.responsiveImage.src,
        alt: content.articles[0].visual.responsiveImage.alt,
        srcSet: content.articles[0].visual.responsiveImage.srcSet,
      });
      if (content.articles.length > 1) {
        setSecondairBlock({
          title: content.articles[1].title,
          slug: content.articles[1].slug,
          label: "Bekijk artikel",
          src: content.articles[1].visual.responsiveImage.src,
          alt: content.articles[1].visual.responsiveImage.alt,
          srcSet: content.articles[1].visual.responsiveImage.srcSet,
        });
      } else {
        setSecondairBlock({
          title: content.secondairBlockTitle,
          slug: content.secondairBlockLink,
          label: content.secondairBlockLinkLabel,
          src: content.secondairBlockImage
            ? content.secondairBlockImage.responsiveImage.src
            : null,
          alt: content.secondairBlockImage
            ? content.secondairBlockImage.responsiveImage.alt
            : null,
          srcSet: content.secondairBlockImage
            ? content.secondairBlockImage.responsiveImage.srcSet
            : null,
        });
      }
    } else {
      setMainBlock({
        title: content.mainBlockTitle,
        slug: content.mainBlockLink,
        label: content.mainBlockLinkLabel,
        src: content.mainBlockImage
          ? content.mainBlockImage.responsiveImage.src
          : null,
        alt: content.mainBlockImage
          ? content.mainBlockImage.responsiveImage.alt
          : null,
        srcSet: content.mainBlockImage
          ? content.mainBlockImage.responsiveImage.srcSet
          : null,
      });
      setSecondairBlock({
        title: content.secondairBlockTitle,
        slug: content.secondairBlockLink,
        label: content.secondairBlockLinkLabel,
        src: content.secondairBlockImage
          ? content.secondairBlockImage.responsiveImage.src
          : null,
        alt: content.secondairBlockImage
          ? content.secondairBlockImage.responsiveImage.alt
          : null,
        srcSet: content.secondairBlockImage
          ? content.secondairBlockImage.responsiveImage.srcSet
          : null,
      });
    }
  }, [content]);

  return (
    <section className="grid-images">
      {mainBlock && (
        <div className="grid-images__tile-container grid-images__tile-container--main">
          <div className="grid-images__tile-image">
            <img srcSet={mainBlock.srcSet} alt={mainBlock.alt} />
            <div className="grid-images__tile-context-container">
              {mainBlock.title && (
                <h4 className="grid-images__tile-title">{mainBlock.title}</h4>
              )}
              {mainBlock.slug && (
                <Button
                  to={mainBlock.slug}
                  text={mainBlock.label}
                  type={"solid"}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {secondairBlock && (
        <div className="grid-images__tile-container grid-images__tile-container--second">
          <div className="grid-images__tile-image">
            <img srcSet={secondairBlock.srcSet} alt={secondairBlock.alt} />
          </div>
          <div className="grid-images__tile-context-container">
            {secondairBlock.title && (
              <h4 className="grid-images__tile-title">
                {secondairBlock.title}
              </h4>
            )}
            {secondairBlock.slug && (
              <Button
                to={secondairBlock.slug}
                text={secondairBlock.label}
                type={"solid"}
              />
            )}
          </div>
        </div>
      )}
      <div className="grid-images__tile-container grid-images__tile-container--third"></div>
    </section>
  );
};
export default GridImages;
