import React from "react";

import "./Hero.scss";

const Hero = (props) => {
  return (
    <section className={`hero ${props.maxHeight ? "hero--max-height" : ""}`}>
      {props.title && (
        <div className="hero__title-container">
          <h1 className="hero__title">{props.title}</h1>
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
