import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { DatoContext } from "../../hooks/datoCMS";

import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";

const SlugPage = () => {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch(
      `https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com/api/articles?filters[Slug][$eq]=/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setArticle(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);
  useEffect(() => {
    fetch(
      `https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com/api/pages?filters[Slug][$eq]=/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setPage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);
  return (
    <main className="slug-page">
      {article && article.length > 0 && <ComponentLoader article={article} />}
      {page && page.length > 0 && <ComponentLoader page={page} />}
    </main>
  );
};
export default SlugPage;
