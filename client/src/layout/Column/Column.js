import React from "react";

import "./Column.scss";

const Column = (props) => {
  return (
    <div
      className={`col col--${props.col} ${
        props.noMargin ? "col--noMargin" : ""
      }`}>
      {props.children}
    </div>
  );
};
export default Column;
