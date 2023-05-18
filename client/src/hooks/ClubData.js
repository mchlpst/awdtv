import React, { useEffect, createContext, useState } from "react";
import axios from "axios";

export const ClubDataContext = createContext();

export const ClubProvider = ({ children }) => {
  const [clubData, setClubData] = useState(null);
  let today = new Date();

  let fromDd = String(today.getDate()).padStart(2, "0");
  let fromMm = String(today.getMonth() + 1).padStart(2, "0");
  let fromYyyy = today.getFullYear();

  let future = new Date(today.setMonth(today.getMonth() + 6));

  let toDd = String(future.getDate()).padStart(2, "0");
  let toMm = String(future.getMonth() + 1).padStart(2, "0");
  let toYyyy = future.getFullYear();

  let fromDate = `${fromYyyy}-${fromMm}-${fromDd}`;
  let toDate = `${toYyyy}-${toMm}-${toDd}`;

  useEffect(() => {
    fetch(
      `https://api-mijn.korfbal.nl/api/v2/clubs/NCX14G7/program?&dateFrom=${fromDate}&dateTo=${toDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw `error with status ${res.status}`;
        }
      })
      .then((res) => {
        console.log(res);
        setClubData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <ClubDataContext.Provider value={clubData}>
      {children}
    </ClubDataContext.Provider>
  );
};
