import React from "react";
import { WhatsappShareButton } from "react-share";
import { SocialIcon } from "react-social-icons";

import "./Article.scss";

const Article = (props) => {
  const content = props.data;
  const shareUrl = window.location.origin + "/" + content.slug;

  return (
    <section className="article">
      <div className="article__header">
        <div className="article__visual-container">
          <img
            srcSet={
              content.visual
                ? content.visual.responsiveImage.srcSet
                : "/img/background-fallback.jpeg"
            }
            className="all-articles__article-image"
            alt={
              content.visual
                ? content.visual.responsiveImage.alt
                : "Een wedstrijd van AW.DTV op het veld van AW.DTV"
            }
          />
        </div>
        <div className="article__header-text-container">
          <h1 className="article__title">{content.Title}</h1>
          <p className="article__date">{content.Data}</p>
          <div className="article__share-container">
            <WhatsappShareButton size={32} url={shareUrl}>
              <SocialIcon
                network="whatsapp"
                bgColor="transparent"
                fgColor="white"
              />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
      <article
        className="article__content"
        dangerouslySetInnerHTML={{ __html: content.Content }}
      />
    </section>
  );
};
export default Article;
