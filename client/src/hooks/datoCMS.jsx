import React, { useEffect, createContext } from "react";

export const DatoContext = createContext();

export const DatoProvider = ({ children }) => {
  const client = null;
  // const [client, setClient] = useState();
  useEffect(() => {
    // fetch("https://graphql.datocms.com/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: `Bearer ${process.env.VITE__DATO_TOKEN}`,
    //   },
    //   body: JSON.stringify({
    //     query: query,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setClient(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);
  return <DatoContext.Provider value={client}>{children}</DatoContext.Provider>;
};
