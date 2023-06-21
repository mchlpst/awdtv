import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { DatoContext } from "../../hooks/datoCMS";

import Grid from "../../layout/Grid/Grid";
import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";

const SlugPage = () => {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      if (context.allArticles) {
        let pageItem = context.allArticles.find((item) => {
          return item.slug === slug;
        });
        setData({ pageItem });
      }
    }
  }, [context]);

  console.log();
  return (
    <main className="slug-page">{data && <ComponentLoader data={data} />}</main>
  );
};
export default SlugPage;
