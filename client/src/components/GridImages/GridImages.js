import React, { useState, useEffect, useContext } from "react";

import "./GridImages.scss";
import Button from "../Button/Button";
import { ClubDataContext } from "../../hooks/ClubData";
import { useTimer } from "../../hooks/countDown";

const GridImages = (props) => {
  const [mainBlock, setMainBlock] = useState(null);
  const [secondairBlock, setSecondairBlock] = useState(null);
  const [nextMatchDate, setNextMatchDate] = useState(null);
  const [countDown, setCountDown] = useState(null);
  const [nextMatch, setNextMatch] = useState({
    day: null,
    month: null,
    hours: null,
    minutes: null,
    home: null,
    away: null,
  });
  const content = props.data;
  const clubData = useContext(ClubDataContext);

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

  useEffect(() => {
    if (clubData && clubData.program && clubData.program.res) {
      const program = clubData.program.res;
      let dateArray = [];

      program.map((item) => {
        item.matches.forEach((match) => {
          if (
            match.teams.home.name === "AW/DTV 5" ||
            match.teams.away.name === "AW/DTV 5"
          ) {
            setNextMatch((prevState) => ({
              ...prevState,
              home: match.teams.home.name,
              away: match.teams.away.name,
            }));
            dateArray.push(match.date);
          } else {
            return;
          }
        });
      });
      setNextMatchDate(dateArray[0] || null);
      if (nextMatchDate !== null) {
        const rawDate = new Date(nextMatchDate);
        const day = String(rawDate.getDate()).padStart(2, "0");
        const month = String(
          rawDate.toLocaleString("nl-NL", { month: "long" })
        );
        const hours = String(rawDate.getHours()).padStart(2, "0");
        const minutes = String(rawDate.getMinutes()).padStart(2, "0");
        setNextMatch((prevState) => ({
          ...prevState,
          day: day,
          month: month,
          hours: hours,
          minutes: minutes,
        }));
      }
    }
  }, [clubData, nextMatchDate]);

  const time = useTimer(nextMatchDate);

  useEffect(() => {
    setCountDown(time);
  }, [time]);

  return (
    <section className="grid-images">
      {mainBlock && (
        <div className="grid-images__tile-container grid-images__tile-container--main">
          <div className="grid-images__tile-image">
            <img srcSet={mainBlock.srcSet} alt={mainBlock.alt} />
          </div>
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
      <div className="grid-images__tile-container grid-images__tile-container--third">
        {nextMatchDate && (
          <>
            <div className="grid-images__date-container">
              <h5 className="grid-images__date-day">{nextMatch.day}</h5>
              <p className="grid-images__date-month">{nextMatch.month}</p>
              <p className="grid-images__date-time">
                {nextMatch.hours}:{nextMatch.minutes} uur
              </p>
            </div>
            <div className="grid-images__game-container">
              <p className="grid-images__game">
                {nextMatch.home} - {nextMatch.away}
              </p>
            </div>
            <div className="grid-images__countdown-container">
              <div className="grid-images__days grid-images__countdown-block">
                <p>{countDown.days}</p>
                <span>Dagen</span>
              </div>
              <div className="grid-images__hours grid-images__countdown-block">
                <p>{countDown.hours}</p>
                <span>Uren</span>
              </div>
              <div className="grid-images__minutes grid-images__countdown-block">
                <p>{countDown.minutes}</p>
                <span>Minuten</span>
              </div>
              <div className="grid-images__seconds grid-images__countdown-block">
                <p>{countDown.seconds}</p>
                <span>Seconden</span>
              </div>
            </div>
          </>
        )}
        {!nextMatchDate && (
          <div className="grid-images__no-match-container">
            <div className="grid-images__no-match-title-container">
              <h5 className="grid-images__no-match-title">
                Geen geplande wedstrijd
              </h5>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default GridImages;
