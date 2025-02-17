import React, { useEffect, useState } from "react";

import Page from "../../components/Page/Page";

import "./TrainingScheme.scss";

const TrainingScheme = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      `https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com/api/training-scheme?populate[0]=Visual&populate[1]=Content`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.data.attributes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {}, [data]);
  return (
    <>
      <Page data={data} dualContent />
    </>
  );
};
export default TrainingScheme;
