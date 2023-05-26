import React from "react";

import "./Grid.scss";
const Grid = (props) => {
  return (
    <div className={`grid ${props.noMargin ? "grid--noMargin" : ""}`}>
      {props.children}
    </div>
  );
};
export default Grid;
