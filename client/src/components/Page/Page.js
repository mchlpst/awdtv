import React, { useEffect } from "react";
import { WhatsappShareButton } from "react-share";
import { SocialIcon } from "react-social-icons";

import "./Page.scss";

const Page = (props) => {
  const content = props.data;
  const shareUrl = window.location.origin + "/" + content.slug;
  console.log(content.attachments);
  return (
    <section className="page">
      <div className="page__header">
        <div className="page__visual-container">
          <img
            srcSet={content.visual.responsiveImage.srcSet}
            alt={content.visual.responsiveImage.alt}
          />
        </div>
        <div className="page__header-text-container">
          <h1 className="page__title">{content.title}</h1>
          <p className="page__date">{content.date}</p>
        </div>
      </div>
      <article
        className="page__content"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
      {content.attachments.length > 0 && (
        <>
          {content.attachments[0].filename.includes(".pdf") && (
            <section className="page__content">
              <embed
                src={content.attachments[0].url}
                width="100%"
                height="800px"
              />
            </section>
          )}
          {content.attachments[0].filename.includes(".png") && (
            <section className="page__content">
              <img src={content.attachments[0].url} width="100%" />
            </section>
          )}
          {content.attachments[0].filename.includes(".jpg") && (
            <section className="page__content">
              <img src={content.attachments[0].url} width="100%" />
            </section>
          )}
        </>
      )}
    </section>
  );
};
export default Page;
