import React, { useContext, useState, useEffect } from "react";
import { DatoContext } from "../../hooks/datoCMS";

import { ReactComponent as FacebookLogo } from "../../assets/svg/facebook.svg";
import { ReactComponent as TwitterLogo } from "../../assets/svg/x-twitter.svg";
import { ReactComponent as InstagramLogo } from "../../assets/svg/instagram.svg";
import { ReactComponent as TiktokLogo } from "../../assets/svg/tiktok.svg";
import { ReactComponent as YoutubeLogo } from "../../assets/svg/youtube.svg";
import { ReactComponent as Nix18Logo } from "../../assets/svg/nix-18.svg";

import "./Footer.scss";

const Footer = () => {
  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.footer);
      console.log(data);
    }
  }, [context]);
  const year = () => {
    let date = new Date();
    return date.getFullYear();
  };

  return (
    <footer className="footer">
      {data && (
        <>
          <section className="footer__row footer__row--red">
            <div className="footer__column-container">
              {data.columns.map((item, index) => {
                return (
                  <div className="footer__column" key={index}>
                    <h3 className="footer__column-title">{item.title}</h3>
                    {item.text !== "" && (
                      <div
                        className="footer__column-text"
                        dangerouslySetInnerHTML={{ __html: item.text }}></div>
                    )}
                    {item.links.length !== 0 && item.text === "" && (
                      <ul className="footer__column-link-list">
                        {item.links.map((link, index) => {
                          return (
                            <li
                              className="footer__column-link-item"
                              key={index}>
                              <a
                                className="footer__column-link"
                                href={link.url || `/${link.link.slug}`}>
                                {link.linkLabel}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
              <div className="footer__column">
                <h3 className="footer__column-title">Social Media</h3>
                <div className="footer__social-container">
                  {data.facebookLink && (
                    <a
                      href={data.facebookLink}
                      className="footer__social-link"
                      target="_blank">
                      <FacebookLogo className="footer__social-icons" />
                    </a>
                  )}
                  {data.twitterLink && (
                    <a
                      href={data.twitterLink}
                      className="footer__social-link"
                      target="_blank">
                      <TwitterLogo className="footer__social-icons" />
                    </a>
                  )}
                  {data.instagramLink && (
                    <a
                      href={data.instagramLink}
                      className="footer__social-link"
                      target="_blank">
                      <InstagramLogo className="footer__social-icons" />
                    </a>
                  )}
                  {data.TiktokLink && (
                    <a
                      href={data.TiktokLink}
                      className="footer__social-link"
                      target="_blank">
                      <TiktokLogo className="footer__social-icons" />
                    </a>
                  )}
                  {data.youtubeLink && (
                    <a
                      href={data.youtubeLink}
                      className="footer__social-link"
                      target="_blank">
                      <YoutubeLogo className="footer__social-icons" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="footer__row footer__row--black">
            <div className="footer__column-container">
              {data.hoofdsponser && (
                <div className="footer__main-sponsor-container">
                  <h5 className="footer__main-sponsor-title">Hoofdsponser</h5>
                  <div className="footer__main-sponsor-image-container">
                    <img
                      src={
                        data.hoofdsponser.responsiveImage
                          ? data.hoofdsponser.responsiveImage.srcSet
                          : data.hoofdsponser.url
                      }
                      alt={data.hoofdsponser.alt || ""}
                      className="footer__main-sponsor-image"
                    />
                  </div>
                </div>
              )}
              <div className="footer__sponsor-container">
                {data.sponsoren.length !== 0 &&
                  data.sponsoren.map((sponsor, index) => {
                    return (
                      <div className="footer__sponsor-item" key={index}>
                        <img
                          src={
                            sponsor.responsiveImage
                              ? sponsor.responsiveImage.srcSet
                              : sponsor.url
                          }
                          alt={sponsor.alt}
                          className="footer__sponsor-image"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
          <section>
            <div>&copy; {year()} Copyright AWDTV • Korfbal Amsterdam</div>
            <div>
              <Nix18Logo />
            </div>
            <div>
              Website door{" "}
              <a target="_blank" href="https://mediabirds.nl">
                Mediabirds
              </a>
            </div>
          </section>
        </>
      )}
    </footer>
  );
};
export default Footer;
