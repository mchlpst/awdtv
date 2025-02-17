import React, { useEffect, useState, useContext } from "react";
import SubscribeForm from "../../components/SubscribeForm/Subscribeform";
import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";

import "./BecomeMember.scss";

const BecomeMember = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      `https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com/api/lid-worden?populate[0]=Background`,
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
  return (
    <main className="become-member">
      {data && (
        <>
          <section className="become-member__background">
            <img
              src={data.Background.data.attributes.url}
              alt={data.Background.data.attributes.alternativeText}
            />
          </section>
          <section className="become-member__title-container">
            <h1 className="become-member__title">{data.Title}</h1>
          </section>
        </>
      )}

      <section className="become-member__content">
        <Grid>
          <Column col={12}>
            <SubscribeForm />
          </Column>
        </Grid>
      </section>
    </main>
  );
};
export default BecomeMember;
