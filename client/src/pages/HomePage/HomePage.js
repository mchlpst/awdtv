import React, { useState, useEffect, useContext } from "react";
import { DatoContext } from "../../hooks/datoCMS";

import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";
import AllArticles from "../../components/AllArticles/AllArticles";

const HomePage = () => {
  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.home);
    }
  }, [context]);

  return (
    <main>
      {data && (
        <>
          <ComponentLoader data={data} />
          <AllArticles />
        </>
      )}
    </main>
  );
};
export default HomePage;
