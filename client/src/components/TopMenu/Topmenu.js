import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DatoContext } from "../../hooks/datoCMS";

import "./TopMenu.scss";

const TopMenu = () => {
  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.topNavigation);
    }
  }, [context]);

  return (
    <nav className="top-menu">
      {data &&
        data.content.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.url || item.link.slug}
              className="top-menu__link">
              {item.linkLabel}
            </Link>
          );
        })}
    </nav>
  );
};

export default TopMenu;
