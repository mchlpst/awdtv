import React, { useEffect, useState } from "react";
import { ReactComponent as Chevron } from "../../assets/svg/Chevron.svg";
import "./VolenteerCalendar.scss";

function getAllEvents(monthData) {
  return monthData.days.reduce(
    (allEvents, day) => allEvents.concat(day.events),
    []
  );
}

const VolenteerCalendar = () => {
  const [months, setMonths] = useState([]);
  const [activeMonthIndex, setActiveMonthIndex] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    fetch("/content/volenteers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMonths(res);
        console.log(res);
        // Set active month to the current month or the first month in the array
        const currentDate = new Date();
        const currentMonthIndex = res.findIndex(
          (month) =>
            month.year === currentDate.getFullYear() &&
            month.number === currentDate.getMonth() + 1
        );
        setActiveMonthIndex(currentMonthIndex !== -1 ? currentMonthIndex : 0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (months.length > 0) {
      updateTasks();
    }
  }, [months, activeMonthIndex, activeDay]);

  const updateTasks = () => {
    const activeMonth = months[activeMonthIndex];
    if (!activeMonth) return;

    if (activeDay !== null) {
      const dayData = activeMonth.days.find((day) => day.day === activeDay);
      setTasks(dayData ? dayData.events : []);
    } else {
      setTasks(getAllEvents(activeMonth));
    }
  };

  const handleDaySelected = (selectedDay) => {
    setActiveDay(activeDay === selectedDay ? null : selectedDay);
  };

  const handleMonthChange = (direction) => {
    setActiveMonthIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      return newIndex >= 0 && newIndex < months.length ? newIndex : prevIndex;
    });
    setActiveDay(null);
  };

  if (months.length === 0 || activeMonthIndex === null) return null;

  const convertDate = (date) => {
    const setDate = new Date(date);
    const options = {
      month: "long",
      day: "numeric",
    };
    return setDate.toLocaleDateString("nl-NL", options);
  };

  const activeMonth = months[activeMonthIndex];

  return (
    <section className="volenteer-calendar">
      <div className="volenteer-calendar__calendar-wrapper">
        <div className="volenteer-calendar__calendar-header">
          <button
            className="volenteer-calendar__button"
            onClick={() => handleMonthChange(-1)}
            disabled={activeMonthIndex === 0}>
            <Chevron className="volenteer-calendar__icon volenteer-calendar__icon--previous" />
          </button>
          <h3 className="volenteer-calendar__calendar-title">
            {activeMonth.name} {activeMonth.year}
          </h3>
          <button
            className="volenteer-calendar__button"
            onClick={() => handleMonthChange(1)}
            disabled={activeMonthIndex === months.length - 1}>
            <Chevron className="volenteer-calendar__icon volenteer-calendar__icon--next" />
          </button>
        </div>
        <div className="volenteer-calendar__calendar">
          <ul className="volenteer-calendar__calendar-list-header">
            <li className="volenteer-calendar__calendar-header-item">M</li>
            <li className="volenteer-calendar__calendar-header-item">D</li>
            <li className="volenteer-calendar__calendar-header-item">W</li>
            <li className="volenteer-calendar__calendar-header-item">D</li>
            <li className="volenteer-calendar__calendar-header-item">V</li>
            <li className="volenteer-calendar__calendar-header-item">Z</li>
            <li className="volenteer-calendar__calendar-header-item">Z</li>
          </ul>
          <ul className="volenteer-calendar__calendar-days-list">
            {Array(activeMonth.offset)
              .fill()
              .map((_, i) => (
                <li key={`offset-${i}`}></li>
              ))}
            {activeMonth.days.map((day) => (
              <li
                key={`day-${day.day}`}
                className={`volenteer-calendar__calendar-days ${
                  activeDay === day.day
                    ? "volenteer-calendar__calendar-days--selected"
                    : ""
                }`}
                onClick={() => handleDaySelected(day.day)}>
                <span>{day.day}</span>
                {day.events.length > 0 && (
                  <div
                    className={
                      day.events.length === 1
                        ? "volenteer-calendar__day-dot"
                        : "volenteer-calendar__day-dots"
                    }></div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="volenteer-calendar__calendar-task-wrapper">
        {tasks.length > 0 ? (
          <>
            <h3 className="volenteer-calendar__calendar-task-title">
              {activeDay
                ? `${activeDay} ${activeMonth.name} ${activeMonth.year}`
                : `Alle diensten in ${activeMonth.name} ${activeMonth.year}`}
            </h3>
            <ul className="volenteer-calendar__calendar-task-list">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`volenteer-calendar__calendar-task volenteer-calendar__calendar-task--${task.type}`}>
                  <div className="volenteer-calendar__calendar-task-type"></div>
                  <div className="volenteer-calendar__calendar-task-container">
                    <h4 className="volenteer-calendar__calendar-task-title">
                      {task.description}
                    </h4>
                    <div className="volenteer-calendar__calendar-task-date-container">
                      <div className="volenteer-calendar__calendar-task-date-item">
                        <h6 className="volenteer-calendar__calendar-task-date-label">
                          Datum
                        </h6>
                        <p className="volenteer-calendar__calendar-task-date-value">
                          {convertDate(task.date)}
                        </p>
                      </div>
                      <div className="volenteer-calendar__calendar-task-date-item">
                        <h6 className="volenteer-calendar__calendar-task-date-label">
                          Van
                        </h6>
                        <p className="volenteer-calendar__calendar-task-date-value">
                          {task.timeFrom}
                        </p>
                      </div>
                      <div className="volenteer-calendar__calendar-task-date-item">
                        <h6 className="volenteer-calendar__calendar-task-date-label">
                          Tot
                        </h6>
                        <p className="volenteer-calendar__calendar-task-date-value">
                          {task.timeTill}
                        </p>
                      </div>
                      <div className="volenteer-calendar__calendar-task-date-item">
                        <h6 className="volenteer-calendar__calendar-task-date-label">
                          {task.persons ? "Vrijwilligers" : "Vrijwilliger"}
                        </h6>
                        <p
                          className={`volenteer-calendar__calendar-task-date-value ${
                            task.persons
                              ? "volenteer-calendar__calendar-task-date-value--multiple"
                              : ""
                          }`}>
                          {task.persons ? (
                            task.persons.map((person) => (
                              <strong className="volenteer-calendar__calendar-task-person">
                                {person}
                              </strong>
                            ))
                          ) : task.person ? (
                            <strong className="volenteer-calendar__calendar-task-person">
                              {task.person}
                            </strong>
                          ) : (
                            <em className="volenteer-calendar__calendar-task-person volenteer-calendar__calendar-task-person--empty">
                              Leeg
                            </em>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="volenteer-calendar__calendar-task-fallback">
            Er zijn geen diensten deze maand
          </div>
        )}
      </div>
    </section>
  );
};

export default VolenteerCalendar;
