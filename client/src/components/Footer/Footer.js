import React, { useState, useEffect } from "react";

import { ReactComponent as FacebookLogo } from "../../assets/svg/facebook.svg";
import { ReactComponent as TwitterLogo } from "../../assets/svg/x-twitter.svg";
import { ReactComponent as InstagramLogo } from "../../assets/svg/instagram.svg";
import { ReactComponent as TiktokLogo } from "../../assets/svg/tiktok.svg";
import { ReactComponent as YoutubeLogo } from "../../assets/svg/youtube.svg";
import { ReactComponent as Nix18Logo } from "../../assets/svg/nix-18.svg";

import "./Footer.scss";

const Footer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      `https://awdtv-cms-8c73f71b0b4d.herokuapp.com/api/footer?populate[0]=Hoofdsponsor&populate[1]=Sponsoren&populate[2]=Column&populate[3]=Column.Links&populate[4]=Column.Links.article&populate[5]=Column.Links.page`,
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
        setData(res.data.attributes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const year = () => {
    let date = new Date();
    return date.getFullYear();
  };
  console.log(data);

  return (
    <footer className="footer">
      {data && (
        <>
          <section className="footer__row footer__row--red">
            <div className="footer__column-container">
              {data.Column.map((item, index) => {
                return (
                  <div className="footer__column" key={index}>
                    <h3 className="footer__column-title">{item.Title}</h3>
                    {item.Text !== "" && (
                      <div
                        className="footer__column-text"
                        dangerouslySetInnerHTML={{ __html: item.Text }}></div>
                    )}
                    {item.Links.length !== 0 &&
                      (item.Text === "" || !item.Text) && (
                        <ul className="footer__column-link-list">
                          {item.Links.map((link, index) => {
                            return (
                              <li
                                className="footer__column-link-item"
                                key={index}>
                                {link.Url !== "" &&
                                  (!link.article.data || !link.page.data) && (
                                    <a
                                      className="footer__column-link"
                                      href={link.url}>
                                      {link.LinkLabel}
                                    </a>
                                  )}
                                {!link.article.data && link.page.data && (
                                  <a
                                    className="footer__column-link"
                                    href={link.page.data.attributes.Slug}>
                                    {link.page.data.attributes.Title}
                                  </a>
                                )}
                                {link.article.data && (
                                  <a
                                    className="footer__column-link"
                                    href={link.article.data.attributes.Slug}>
                                    {link.article.data.attributes.Title}
                                  </a>
                                )}
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
                  {data.Facebook && (
                    <a
                      href={data.Facebook}
                      className="footer__social-link"
                      target="_blank"
                      rel="noreferrer">
                      <FacebookLogo className="footer__social-icons" />
                    </a>
                  )}
                  {data.X && (
                    <a
                      href={data.X}
                      className="footer__social-link"
                      target="_blank"
                      rel="noreferrer">
                      <TwitterLogo className="footer__social-icons" />
                    </a>
                  )}
                  {data.Instagram && (
                    <a
                      href={data.Instagram}
                      className="footer__social-link"
                      target="_blank"
                      rel="noreferrer">
                      <InstagramLogo className="footer__social-icons" />
                    </a>
                  )}
                  {data.TikTok && (
                    <a
                      href={data.TikTok}
                      className="footer__social-link"
                      target="_blank"
                      rel="noreferrer">
                      <TiktokLogo className="footer__social-icons" />
                    </a>
                  )}
                  {data.Youtube && (
                    <a
                      href={data.Youtube}
                      className="footer__social-link"
                      target="_blank"
                      rel="noreferrer">
                      <YoutubeLogo className="footer__social-icons" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="footer__row footer__row--black">
            <div className="footer__column-container">
              {data.Hoofdsponsor.data && (
                <div className="footer__main-sponsor-container">
                  <h5 className="footer__main-sponsor-title">Hoofdsponsor</h5>
                  <div className="footer__main-sponsor-image-container">
                    <img
                      src={data.Hoofdsponsor.data.attributes.url}
                      alt={
                        data.Hoofdsponsor.data.attributes.alternativeText || ""
                      }
                      className="footer__main-sponsor-image"
                    />
                  </div>
                </div>
              )}
              <div className="footer__sponsor-container">
                {data.Sponsoren.data.length !== 0 &&
                  data.Sponsoren.data.map((sponsor, index) => {
                    return (
                      <div className="footer__sponsor-item" key={index}>
                        <img
                          src={sponsor.attributes.url}
                          alt={sponsor.attributes.alternativeText}
                          className="footer__sponsor-image"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
          <section className="footer__bottom">
            <div className="footer__copyright">
              &copy; {year()} Copyright AWDTV • Korfbal Amsterdam
            </div>
            <div className="footer__nix-logo">
              <Nix18Logo />
            </div>
            <div className="footer__credits">
              Website door{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://mediabirds.nl"
                className="footer__credits-link">
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
