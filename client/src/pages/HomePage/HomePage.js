import React, { useState, useEffect, useContext } from "react";
import { DatoContext } from "../../hooks/datoCMS";
import { Helmet, HelmetProvider } from "react-helmet-async";

import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";
import AllArticles from "../../components/AllArticles/AllArticles";
import CompetitionTable from "../../components/CompetitionTable/CompetitionTable";

import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";

import "./HomePage.scss";
import InstagramBlock from "../../components/InstagramBlock/InstagramBlock";
import Calendar from "../../components/Calendar/Calendar";

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

  return (
    <main className="homepage">
      {data && (
        <HelmetProvider>
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
              {/* <Calendar /> */}
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
