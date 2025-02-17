import React, { useEffect, useState } from "react";

import { ReactComponent as ChevronLeft } from "../../assets/svg/chevronLeft.svg";
import { ReactComponent as ChevronRight } from "../../assets/svg/chevronRight.svg";

import {
  getDate,
  getDateNoYear,
  getTime,
  convertToMonthYear,
} from "../../hooks/ConvertDate";

import "./Calendar.scss";
import Button from "../Button/Button";

const Calendar = () => {
  const today = new Date();
  const [data, setData] = useState(null);
  const [events, setEvents] = useState({});
  const [activeDate, setActiveDate] = useState(today);

  useEffect(() => {
    fetch("content/all-calendars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  const changeMonth = (direction) => {
    const newDate = activeDate;
    setActiveDate(
      new Date(newDate.setMonth(activeDate.getMonth() + direction))
    );
  };

  useEffect(() => {
    if (data) {
      const activeMonth = activeDate.getMonth();
      const activeYear = activeDate.getFullYear();
      const upcomingEvents = data.slice(1).filter((data) => {
        const item = data.attributes;
        const event = new Date(item.EventDate);
        const eventMonth = event.getMonth();
        const eventYear = event.getFullYear();
        return eventMonth === activeMonth && eventYear === activeYear;
      });
      setEvents(upcomingEvents);
    }
  }, [activeDate, data]);

  return (
    <section className="calendar">
      <h2 className="calendar__title">Agenda</h2>
      {data && data.length > 0 ? (
        <div className="calendar__wrapper">
          <div className="calendar__upcoming-wrapper">
            <span className="calendar__upcoming-subtitle">
              Eerst volgende evenement
            </span>
            <h2 className="calendar__upcoming-title">
              {data[0].attributes.Title}
            </h2>
            <p className="calendar__date-container">
              <span className="calendar__date">
                {getDate(data[0].attributes.EventDate)}
              </span>
              <span className="calendar__time">
                {getTime(data[0].attributes.EventDate)}
              </span>
            </p>
          </div>
          <div className="calendar__events-wrapper">
            <div className="calendar__navigation-wrapper">
              <button
                onClick={() => changeMonth(-1)}
                className="calendar__navigation-button">
                <ChevronLeft className="calendar__navigation-icon" />
              </button>
              <div className="calendar__navigation-title">
                {convertToMonthYear(activeDate)}
              </div>
              <button
                onClick={() => changeMonth(+1)}
                className="calendar__navigation-button">
                <ChevronRight className="calendar__navigation-icon" />
              </button>
            </div>
            {events.length > 0 ? (
              <ul className="calendar__events-list">
                {events.map((event) => (
                  <li
                    key={event.attributes.EventDate}
                    className="calendar__event-item">
                    <details className="calendar__details">
                      <summary className="calendar__summary">
                        <h4 className="calendar__event-title">
                          <span className="calendar__event-date">
                            {getDateNoYear(event.attributes.EventDate)}
                          </span>
                          {event.attributes.Title}
                        </h4>
                        <ChevronLeft className="calendar__summary-icon" />
                      </summary>
                      <div className="calendar__details-container">
                        <div className="calendar__details-content">
                          {event.attributes.Location && (
                            <p className="calendar__event-location">
                              <span>Locatie:</span> {event.attributes.Location}
                            </p>
                          )}
                          <p className="calendar__event-time">
                            <span>Tijdstip:</span>
                            {getTime(event.attributes.EventDate)}
                          </p>
                        </div>
                        {event.articleLink && (
                          <Button
                            type="solid"
                            to={event.articleLink.slug}
                            text="Lees meer"></Button>
                        )}
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="calendar__no-event">
                Er zijn geen activiteiten deze maand
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="calendar__no-data">
          Er zijn geen aankomende evenementen
        </div>
      )}
    </section>
  );
};
export default Calendar;
