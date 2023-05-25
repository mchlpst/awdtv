import React, { useState, useContext, useEffect } from "react";
import { DatoContext } from "../../hooks/datoCMS";

import "./AllArticles.scss";

const AllArticles = () => {
  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.allArticles);
      console.log(data);
    }
  }, [context]);
  return <section></section>;
};
export default AllArticles;
