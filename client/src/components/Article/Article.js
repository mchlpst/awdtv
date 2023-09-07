import React from "react";
import { WhatsappShareButton } from "react-share";
import { SocialIcon } from "react-social-icons";

import "./Article.scss";

const Article = (props) => {
  const content = props.data;
  console.log(content);
  const shareUrl = window.location.origin + "/" + content.slug;

  console.log(shareUrl);
  return (
    <section className="article">
      <div className="article__header">
        <div className="article__visual-container">
          <img
            srcSet={content.visual.responsiveImage.srcSet}
            alt={content.visual.responsiveImage.alt}
          />
        </div>
        <div className="article__header-text-container">
          <h1 className="article__title">{content.title}</h1>
          <p className="article__date">{content.date}</p>
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
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </section>
  );
};
export default Article;
