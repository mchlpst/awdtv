import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGlobalStore } from "../../hooks/GlobalStore";

import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";
import PasswordChecker from "../../components/PasswordChecker/PasswordChecker";

const SlugPage = () => {
  const { slug } = useParams();
  const { state, dispatch } = useGlobalStore();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(
      `https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com/api/articles?filters[Slug][$eq]=/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
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
        dispatch({
          type: "SET_PROPERTY",
          key: "passwordNeeded",
          value: res.passwordNeeded,
        });
        if (!state.passwordNeeded) {
          dispatch({
            type: "SET_PROPERTY",
            key: "currentPage",
            value: res.content,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);
  return (
    <main className="slug-page">
      {state.passwordNeeded && <PasswordChecker />}
      {article && article.length > 0 && <ComponentLoader article={article} />}
      {state.currentPage && <ComponentLoader page={state.currentPage} />}
    </main>
  );
};
export default SlugPage;
