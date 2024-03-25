import React from "react";

import "./Hero.scss";

const Hero = (props) => {
  const convertDate = (moment) => {
    let date = new Date(moment);
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("nl-NL", options);
  };
  return (
    <section className={`hero ${props.maxHeight ? "hero--max-height" : ""}`}>
      {props.title && (
        <div
          className={`hero__title-container ${
            props.page ? "hero__title-container--left" : ""
          }`}>
          <h1 className="hero__title">{props.title}</h1>
          {props.date && (
            <p className="hero__date">{convertDate(props.date)}</p>
          )}
          {props.description && (
            <div
              className="hero__subtitle"
              dangerouslySetInnerHTML={{ __html: props.description }}></div>
          )}
        </div>
      )}
      <img
        src={props.imageSrc ? props.imageSrc : "/img/background-fallback.jpeg"}
        alt={
          props.imageAlt
            ? props.imageAlt
            : "Een wedstrijd van AW.DTV op het veld van AW.DTV"
        }
      />
    </section>
  );
};
export default Hero;
