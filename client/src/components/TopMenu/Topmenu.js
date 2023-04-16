import React from "react";
import { Link } from "react-router-dom";

import "./TopMenu.scss";

const TopMenu = (props) => {
  let data = props.data;
  return (
    <nav className="top-menu">
      {data.Body.map((item, index) => {
        return (
          <Link key={index} to={item.url} className="top-menu__link">
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default TopMenu;
