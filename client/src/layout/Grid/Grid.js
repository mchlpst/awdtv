import React from "react";

import "./Grid.scss";
const Grid = (props) => {
  return (
    <div className={`grid ${props.noMargin ? "grid--noMargin" : ""}`}>
      <div className="grid__container">{props.children}</div>
    </div>
  );
};
export default Grid;
