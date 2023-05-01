import React from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

const Button = (props) => {
  const { text, to, href, type, clickAction } = props;

  return (
    <>
      {href && (
        <a href={href} role="button" className={"btn" + ` btn--${type}`}>
          {text}
        </a>
      )}
      {to && (
        <Link to={to} className={"btn" + ` btn--${type}`}>
          {text}
        </Link>
      )}
      {!href && !to && (
        <button className={"btn" + ` btn--${type}`} onClick={clickAction}>
          {text}
        </button>
      )}
    </>
  );
};
export default Button;
