import React, { useEffect, createContext, useState } from "react";

export const ClubDataContext = createContext();

export const ClubProvider = ({ children }) => {
  const [clubData, setClubData] = useState(null);

  let today = new Date();

  let fromDd = String(today.getDate()).padStart(2, "0");
  let fromMm = String(today.getMonth() + 1).padStart(2, "0");
  let fromYyyy = today.getFullYear();

  // Er zit een bug in de call van de KNKV. Daardoor toont hij het goede schema niet als het groter is dan 2 maanden.
  // Voor nu is de '2' de fix.
  let future = new Date(today.setMonth(today.getMonth() + 2));

  let toDd = String(future.getDate()).padStart(2, "0");
  let toMm = String(future.getMonth() + 1).padStart(2, "0");
  let toYyyy = future.getFullYear();

  let fromDate = `${fromYyyy}-${fromMm}-${fromDd}`;
  let toDate = `${toYyyy}-${toMm}-${toDd}`;

  let past = new Date(today.setMonth(today.getMonth() - 10));

  let pastDd = String(past.getDate()).padStart(2, "0");
  let pastMm = String(past.getMonth() + 1).padStart(2, "0");
  let pastYyyy = past.getFullYear();

  let pastDate = `${pastYyyy}-${pastMm}-${pastDd}`;

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
          throw new Error(`error with status ${res.status}`);
        }
      })
      .then((res) => {
        setClubData((prevState) => ({
          ...prevState,
          program: {
            res,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
      });
    fetch(
      `https://api-mijn.korfbal.nl/api/v2/clubs/NCX14G7/results?&dateFrom=${pastDate}&dateTo=${fromDate}`,
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
          throw new Error(`error with status ${res.status}`);
        }
      })
      .then((res) => {
        setClubData((prevState) => ({
          ...prevState,
          results: {
            res,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
      });
    // Veld = -VE-; Zaal is -ZA-
    fetch(
      `https://api-mijn.korfbal.nl/api/v2/pools/club/NCX14G7?sport=KORFBALL-ZA-WK&team=true`,
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
          throw new Error(`error with status ${res.status}`);
        }
      })
      .then((res) => {
        setClubData((prevState) => ({
          ...prevState,
          standings: {
            res,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <ClubDataContext.Provider value={clubData}>
      {children}
    </ClubDataContext.Provider>
  );
};
