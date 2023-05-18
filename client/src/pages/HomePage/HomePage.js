import React, { useState, useEffect, useContext } from "react";
import { DatoContext } from "../../hooks/datoCMS";

import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";

const HomePage = () => {
  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.home);
    }
  }, [context]);

  return <main>{data && <ComponentLoader data={data} />}</main>;
};
export default HomePage;
