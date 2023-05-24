import React, { useState, useEffect } from "react";

export const useTimer = (date) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const endTime = Date.parse(new Date(date)) / 1000;
      const now = Date.now() / 1000;
      const timeLeft = endTime - now;

      const days = Math.floor(timeLeft / 86400);
      const hours = Math.floor((timeLeft - days * 86400) / 3600);
      const minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
      const seconds = Math.floor(
        timeLeft - days * 86400 - hours * 3600 - minutes * 60
      );

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [date]);

  return time;
};
