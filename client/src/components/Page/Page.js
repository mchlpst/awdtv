import React from "react";

import { WhatsappShareButton } from "react-share";
import { SocialIcon } from "react-social-icons";

import { useViewport } from "../../hooks/useViewport";

import "./Page.scss";

const Page = (props) => {
  const content = props.data;
  const shareUrl = window.location.origin + "/" + content.slug;

  const { isMobile, isTablet } = useViewport({
    mobile: 480,
    tablet: 768,
    laptop: 1024,
    desktop: 1200,
  });

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
              {!isTablet && !isMobile ? (
                <object
                  data={content.attachments[0].url}
                  type="application/pdf">
                  <p>
                    Het lijkt erop dat je browser dit document niet kan laden.
                    Je kan het hier downloaden.&nbsp;
                    <a
                      href={content.attachments[0].url}
                      alt="download link"
                      target="_blank">
                      Download PDF.
                    </a>
                  </p>
                </object>
              ) : (
                <p>
                  Het lijkt erop dat je browser dit document niet kan laden. Je
                  kan het hier downloaden.&nbsp;
                  <a href={content.attachments[0].url}>Download PDF.</a>
                </p>
              )}
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
