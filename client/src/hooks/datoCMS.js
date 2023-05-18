import React, { useEffect, createContext, useState } from "react";
import { query } from "../queries";

export const DatoContext = createContext();

export const DatoProvider = ({ children }) => {
  const [client, setClient] = useState();
  useEffect(() => {
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_DATO_TOKEN}`,
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setClient(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <DatoContext.Provider value={client}>{children}</DatoContext.Provider>;
};
