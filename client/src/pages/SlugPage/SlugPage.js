import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";
import PasswordChecker from "../../components/PasswordChecker/PasswordChecker";

const SlugPage = () => {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [passwordNeeded, setPasswordNeeded] = useState(null);
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
    fetch(`content/pages/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPasswordNeeded(res.passwordNeeded);
        if (!passwordNeeded) {
          setPage(res.content);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);
  return (
    <main className="slug-page">
      {passwordNeeded && <PasswordChecker />}
      {article && article.length > 0 && <ComponentLoader article={article} />}
      {page && <ComponentLoader page={page} />}
    </main>
  );
};
export default SlugPage;
