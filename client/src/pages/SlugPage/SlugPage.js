import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { DatoContext } from "../../hooks/datoCMS";

import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";

const SlugPage = () => {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      if (context.allArticles || context.allPages) {
        let articleItem = context.allArticles.find(
          (article) => article.slug === slug
        );
        let pageItem = context.allPages.find((page) => page.slug === slug);
        setData({ articleItem, pageItem });
      }
    }
    // eslint-disable-next-line
  }, [context, slug]);

  return (
    <main className="slug-page">{data && <ComponentLoader data={data} />}</main>
  );
};
export default SlugPage;
