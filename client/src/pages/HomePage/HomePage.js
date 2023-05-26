import React, { useState, useEffect, useContext } from "react";
import { DatoContext } from "../../hooks/datoCMS";

import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";
import AllArticles from "../../components/AllArticles/AllArticles";

import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";

import "./HomePage.scss";

const HomePage = () => {
  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.home);
    }
  }, [context]);

  return (
    <main className="homepage">
      <Grid>
        {data && (
          <>
            <ComponentLoader data={data} />
            <Column col={8} noMargin>
              <AllArticles />
            </Column>
          </>
        )}
      </Grid>
    </main>
  );
};
export default HomePage;
