import React from "react";

import "./TopMenu.scss";

const TopMenu = (props) => {
  let data = props.data;

  console.log(data);
  return (
    <nav>
      {data.items.data.map((item) => {
        return <p>{item.attributes.title}</p>;
      })}
    </nav>
  );
};

export default TopMenu;
