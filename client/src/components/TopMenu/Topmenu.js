import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DatoContext } from "../../hooks/datoCMS";

import "./TopMenu.scss";

const TopMenu = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      `https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com/api/menus/2?nested&populate=*`,
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
        setData(res.data.attributes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <nav className="top-menu">
      <div className="top-menu__grid">
        {data &&
          data.items.data.map((item, index) => {
            return (
              <Link
                key={index}
                to={item.attributes.url}
                className="top-menu__link">
                {item.attributes.title}
              </Link>
            );
          })}
      </div>
    </nav>
  );
};

export default TopMenu;
