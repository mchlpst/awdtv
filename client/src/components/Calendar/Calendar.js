import React, { useContext, useEffect, useState } from "react";
import { DatoContext } from "../../hooks/datoCMS";

import { ReactComponent as ChevronLeft } from "../../assets/svg/chevronLeft.svg";
import { ReactComponent as ChevronRight } from "../../assets/svg/chevronRight.svg";

import "./Calendar.scss";

const Calendar = () => {
  const today = new Date();
  const [data, setData] = useState(null);
  const [events, setEvents] = useState({});
  const [activeKey, setActiveKey] = useState(
    `${today.getFullYear()}-${today.getMonth() + 1}`
  );
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.allCalenders);
    }
  }, [context]);
  useEffect(() => {}, [data]);

  const getDate = (string) => {
    const date = new Date(string);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const formatDate = new Intl.DateTimeFormat("nl-NL", options).format(date);
    return formatDate;
  };
  const getMonth = (string) => {
    const date = new Date(string);
    const options = { month: "long" };
    const formatDate = new Intl.DateTimeFormat("nl-NL", options).format(date);
    return formatDate;
  };

  useEffect(() => {
    const eventsByMonthAndYear = [];
    if (data) {
      data.map((event) => {
        const date = new Date(event.eventDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year}-${month}`;

        eventsByMonthAndYear.push({ month: key, event });
      });
    }
    setEvents(eventsByMonthAndYear);
  }, [data]);

  const convertToMonthYear = (dateString) => {
    const [year, month] = dateString.split("-");
    const monthName = new Date(`${year}-${month}`).toLocaleString("nl-NL", {
      month: "long",
    });
    return `${monthName} ${year}`;
  };

  const changeMonth = () => {};
  useEffect(() => {
    console.log(events);
  }, [events]);

  const getTime = (dateString) => {
    const date = new Date(dateString);

    const hours = date.getHours().toString().padStart(2, "0"); // Get hours and format as HH
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and format as mm

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };
  return (
    <section className="calendar">
      {data ? (
        <div className="calendar__wrapper">
          <h2 className="calendar__title">Agenda</h2>
          <div className="calendar__upcoming-wrapper">
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
          <div className="calendar__month-wrapper">
            {events && (
              <div>
                <div onClick={() => changeMonth()}>
                  <ChevronLeft />
                </div>
                {/* <div>{convertToMonthYear(events[0].month)}</div> */}
                <div onClick={() => changeMonth()}>
                  <ChevronRight />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="calender__no-data">
          Er zijn geen opkomende evenementen
        </div>
      )}
    </section>
  );
};
export default Calendar;
