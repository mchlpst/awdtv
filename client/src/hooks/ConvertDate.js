export const getDate = (timestamp) => {
  if (!timestamp) {
    console.error("Error in getDate:", timestamp);
    return "";
  }
  const date = new Date(timestamp);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  const formatDate = new Intl.DateTimeFormat("nl-NL", options).format(date);
  return formatDate;
};

export const getDateNoYear = (timestamp) => {
  if (!timestamp) {
    console.error("Error in getDateNoYear:", timestamp);
    return "";
  }
  const date = new Date(timestamp);
  const options = { day: "2-digit", month: "long" };
  const formatDate = new Intl.DateTimeFormat("nl-NL", options).format(date);
  return formatDate;
};

export const getMonth = (timestamp) => {
  if (!timestamp) {
    console.error("Error in getMonth:", timestamp);
    return "";
  }
  const date = new Date(timestamp);
  const options = { month: "long" };
  const formatDate = new Intl.DateTimeFormat("nl-NL", options).format(date);
  return formatDate;
};

export const getTime = (timestamp) => {
  if (!timestamp) {
    console.error("Error in getTime:", timestamp);
    return "";
  }
  const date = new Date(timestamp);

  const hours = date.getHours().toString().padStart(2, "0"); // Get hours and format as HH
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and format as mm

  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
};

export const convertToMonthYear = (activeDate) => {
  const year = activeDate.getFullYear();
  const month = activeDate.getMonth() + 1;
  const monthName = new Date(`${year}-${month}`).toLocaleString("nl-NL", {
    month: "long",
  });
  return `${monthName} ${year}`;
};
