import React, { useState, useEffect, useContext } from "react";
import { DatoContext } from "../../hooks/datoCMS";
import { Helmet } from "react-helmet";

import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";
import AllArticles from "../../components/AllArticles/AllArticles";
import CompetitionTable from "../../components/CompetitionTable/CompetitionTable";

import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";

import "./HomePage.scss";
import InstagramBlock from "../../components/InstagramBlock/InstagramBlock";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [global, setGlobal] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.home);
      setGlobal(context._site);
    }
  }, [context]);

  useEffect(() => {
    if (data) {
      const link = document.querySelector("link[rel~='icon']");

      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = global.favicon.responsiveImage.src;
    }
  }, [data]);

  return (
    <main className="homepage">
      {data && (
        <>
          <Helmet>
            <title>
              {global.globalSeo.siteName}
              {global.globalSeo.titleSuffix
                ? ` ${global.globalSeo.titleSuffix}`
                : ""}
            </title>
          </Helmet>
          <Grid>
            <Column col={12}>
              <ComponentLoader data={data} />
            </Column>
          </Grid>
          <Grid>
            <Column col={8}>
              <AllArticles />
            </Column>
            <Column col={4}>
              <CompetitionTable />
            </Column>
          </Grid>
          <Grid>
            <Column col={12}>
              <InstagramBlock />
            </Column>
          </Grid>
        </>
      )}
    </main>
  );
};
export default HomePage;
