import React, { useEffect, useState } from "react";

// import { WhatsappShareButton } from "react-share";
// import { SocialIcon } from "react-social-icons";

import { useViewport } from "../../hooks/useViewport";

import "./Page.scss";
import Hero from "../Hero/Hero";

const Page = (props) => {
  const [content, setContent] = useState(null);
  const [switchValue, setSwitchValue] = useState(true);
  // let shareUrl = "";

  useEffect(() => {
    setContent(props.data);
    if (props.data) {
      // shareUrl = window.location.origin + "/" + props.data.slug;
    }
  }, [props.data]);

  const handleSwitch = () => {
    setSwitchValue(!switchValue);
  };

  const { isMobile, isTablet } = useViewport({
    mobile: 480,
    tablet: 768,
    laptop: 1024,
    desktop: 1200,
  });

  return (
    <section className="page">
      {content && (
        <>
          <Hero
            title={content.Title}
            date={content.publishedAt}
            imageSrc={null}
            imageAlt={null}
            page
          />
          {props.dualContent !== undefined ? (
            <section className="page__dual-content">
              <div className="page__switch-wrapper">
                <div
                  className={`page__switch-container ${
                    switchValue
                      ? "page__switch-container--left"
                      : "page__switch-container--right"
                  }`}
                  onClick={() => handleSwitch()}>
                  {content.content.map((item) => (
                    <div className="page__switch" key={item.schemeType}>
                      {item.schemeType}
                    </div>
                  ))}
                </div>
              </div>
              <article
                className="page__content"
                dangerouslySetInnerHTML={{
                  __html: switchValue
                    ? content.content[0].content
                    : content.content[1].content,
                }}
              />
            </section>
          ) : (
            <article
              className="page__content"
              dangerouslySetInnerHTML={{ __html: content.Content }}
            />
          )}
          {content.attachments && content.attachments.length > 0 && (
            <>
              {content.attachments[0].filename.includes(".pdf") && (
                <section className="page__content">
                  {!isTablet && !isMobile ? (
                    <object
                      data={content.attachments[0].url}
                      type="application/pdf">
                      <p>
                        Het lijkt erop dat je browser dit document niet kan
                        laden. Je kan het hier downloaden.&nbsp;
                        <a
                          href={content.attachments[0].url}
                          alt="download link"
                          target="_blank"
                          rel="noreferrer">
                          Download PDF.
                        </a>
                      </p>
                    </object>
                  ) : (
                    <p>
                      Het lijkt erop dat je browser dit document niet kan laden.
                      Je kan het hier downloaden.&nbsp;
                      <a href={content.attachments[0].url}>Download PDF.</a>
                    </p>
                  )}
                </section>
              )}
              {content.attachments[0].filename.includes(".png") ||
              content.attachments[0].filename.includes(".jpg") ? (
                <section className="page__content">
                  <img
                    src={content.attachments[0].url}
                    width="100%"
                    alt={content.attachments[0].alt}
                  />
                </section>
              ) : (
                <section className="page__content">
                  <a href={content.attachments[0].url}>
                    {content.attachementLinkText
                      ? content.attachementLinkText
                      : "Download het bestand"}
                  </a>
                </section>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};
export default Page;
