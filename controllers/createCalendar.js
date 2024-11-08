function createMonthsWithEventsCalendar(events) {
  const monthNames = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ];

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getMonthOffset(year, month) {
    return (new Date(year, month, 1).getDay() + 6) % 7;
  }

  function createMonthCalendar(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    return {
      name: monthNames[month],
      number: month + 1,
      year: year,
      offset: getMonthOffset(year, month),
      days: Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        events: [],
      })),
    };
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  if (!events || events.length === 0) {
    // If events are empty or undefined, return previous 3 months and next 8 months with empty events
    const startDate = new Date(currentYear, currentMonth - 3, 1);
    const endDate = new Date(currentYear, currentMonth + 8, 1);
    const months = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      months.push(
        createMonthCalendar(currentDate.getFullYear(), currentDate.getMonth())
      );
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months;
  }

  // Original functionality when events are present
  const previousMonth = (currentMonth - 1 + 12) % 12;
  const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const startDate = new Date(previousMonthYear, previousMonth, 1);

  const lastEvent = events.reduce((latest, event) => {
    const eventDate = new Date(event.date);
    return eventDate > latest ? eventDate : latest;
  }, startDate);

  const months = [];
  let currentDate = new Date(startDate);

  while (currentDate <= lastEvent) {
    months.push(
      createMonthCalendar(currentDate.getFullYear(), currentDate.getMonth())
    );
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    if (eventDate >= startDate) {
      const monthIndex =
        (eventDate.getFullYear() - startDate.getFullYear()) * 12 +
        (eventDate.getMonth() - startDate.getMonth());
      const day = eventDate.getDate();
      months[monthIndex].days[day - 1].events.push(event);
    }
  });

  return months;
}

exports.createMonthsWithEventsCalendar = createMonthsWithEventsCalendar;
