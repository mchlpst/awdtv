import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";
import AllArticles from "../../components/AllArticles/AllArticles";
import CompetitionTable from "../../components/CompetitionTable/CompetitionTable";

import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";

import "./HomePage.scss";
import InstagramBlock from "../../components/InstagramBlock/InstagramBlock";
import Calendar from "../../components/Calendar/Calendar";
import VolenteerCalendar from "../../components/VolenteerCalendar/VolenteerCalendar";

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      `https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com/api/home?populate[0]=Content&populate[1]=Content.MainLink&populate[2]=Content.MainLink.article&populate[3]=Content.SecondairLink&populate[4]=Content.SecondairLink.article&populate[5]=Content.MainLink.page&populate[6]=Content.SecondairLink.page&populate[7]=Content.SecondairBlockImage&populate[8]=seo&populate[9]=Content.MainLink.article.Visual&populate[10]=Content.SecondairLink.article.Visual&populate[11]=Content.SecondairLink.page.Visual&populate[12]=Content.MainLink.page.Visual&populate[13]=Content.MainBlockImage`,
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
    <main className="homepage">
      {data && (
        <HelmetProvider>
          <Helmet>
            <title>{data.seo.metaTitle}</title>
            <meta name="description" content={data.seo.metaDescription} />
          </Helmet>
          <Grid>
            <Column col={12}>
              <ComponentLoader content={data.Content} />
            </Column>
          </Grid>
          <Grid>
            <Column col={8}>
              <AllArticles />
            </Column>
            <Column col={4}>
              <CompetitionTable />
              <Calendar />
            </Column>
          </Grid>
          <Grid>
            <Column col={12}>
              <VolenteerCalendar />
            </Column>
          </Grid>
          <Grid>
            <Column col={12}>
              <InstagramBlock />
            </Column>
          </Grid>
        </HelmetProvider>
      )}
    </main>
  );
};
export default HomePage;
