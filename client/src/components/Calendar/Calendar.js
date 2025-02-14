import React, { useEffect, useState } from "react";

import { ReactComponent as ChevronLeft } from "../../assets/svg/chevronLeft.svg";
import { ReactComponent as ChevronRight } from "../../assets/svg/chevronRight.svg";

import "./Calendar.scss";
import Button from "../Button/Button";

const Calendar = () => {
  const today = new Date();
  const [data, setData] = useState(null);
  const [events, setEvents] = useState({});
  const [activeDate, setActiveDate] = useState(today);

  const getDate = (string) => {
    const date = new Date(string);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const formatDate = new Intl.DateTimeFormat("nl-NL", options).format(date);
    return formatDate;
  };
  const getDateNoYear = (string) => {
    const date = new Date(string);
    const options = { day: "2-digit", month: "long" };
    const formatDate = new Intl.DateTimeFormat("nl-NL", options).format(date);
    return formatDate;
  };
  const getMonth = (string) => {
    const date = new Date(string);
    const options = { month: "long" };
    const formatDate = new Intl.DateTimeFormat("nl-NL", options).format(date);
    return formatDate;
  };
  const changeMonth = (direction) => {
    const newDate = activeDate;
    setActiveDate(
      new Date(newDate.setMonth(activeDate.getMonth() + direction))
    );
  };

  const convertToMonthYear = () => {
    const year = activeDate.getFullYear();
    const month = activeDate.getMonth() + 1;
    const monthName = new Date(`${year}-${month}`).toLocaleString("nl-NL", {
      month: "long",
    });
    return `${monthName} ${year}`;
  };

  useEffect(() => {
    if (data) {
      const activeMonth = activeDate.getMonth();
      const upcomingEvents = data.slice(1).filter((item) => {
        const event = new Date(item.eventDate);
        const eventMonth = event.getMonth();
        return eventMonth === activeMonth;
      });
      setEvents(upcomingEvents);
    }
  }, [activeDate, data]);

  const getTime = (dateString) => {
    const date = new Date(dateString);

    const hours = date.getHours().toString().padStart(2, "0"); // Get hours and format as HH
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and format as mm

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };
  return (
    <section className="calendar">
      <h2 className="calendar__title">Agenda</h2>
      {data && data.length > 0 ? (
        <div className="calendar__wrapper">
          <div className="calendar__upcoming-wrapper">
            <span className="calendar__upcoming-subtitle">
              Eerst volgende evenement
            </span>
            <h2 className="calendar__upcoming-title">{data[0].title}</h2>
            <p className="calendar__date-container">
              <span className="calendar__date">
                {getDate(data[0].eventDate)}
              </span>
              <span className="calendar__time">
                {getTime(data[0].eventDate)}
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
                  <li key={event.eventDate} className="calendar__event-item">
                    <details className="calendar__details">
                      <summary className="calendar__summary">
                        <h4 className="calendar__event-title">
                          <span className="calendar__event-date">
                            {getDateNoYear(event.eventDate)}
                          </span>
                          {event.title}
                        </h4>
                        <ChevronLeft className="calendar__summary-icon" />
                      </summary>
                      <div className="calendar__details-container">
                        <div className="calendar__details-content">
                          <p className="calendar__event-location">
                            <span>Locatie:</span> {event.location}
                          </p>
                          <p className="calendar__event-time">
                            <span>Tijdstip:</span> {getTime(event.eventDate)}
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
