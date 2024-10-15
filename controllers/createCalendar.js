function createYearWithEventsCalendar(year, events) {
  const monthNames = [
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getMonthOffset(year, month) {
    return new Date(year, month, 1).getDay();
  }

  const yearCalendar = {
    year: year,
    months: [],
  };

  for (let month = 0; month < 12; month++) {
    const daysInMonth = getDaysInMonth(year, month);
    const monthObj = {
      name: monthNames[month],
      number: month + 1,
      offset: (getMonthOffset(year, month) + 6) % 7, // Adjust so that Monday is 0 and Sunday is 6
      days: {},
    };

    for (let day = 1; day <= daysInMonth; day++) {
      monthObj.days[day] = [];
    }

    yearCalendar.months.push(monthObj);
  }

  events.forEach((event) => {
    const eventDate = new Date(event.attributes.DateFrom);
    if (eventDate.getFullYear() === year) {
      const month = eventDate.getMonth();
      const day = eventDate.getDate();
      yearCalendar.months[month].days[day].push(event);
    }
  });

  return [yearCalendar];
}

exports.createYearWithEventsCalendar = createYearWithEventsCalendar;
