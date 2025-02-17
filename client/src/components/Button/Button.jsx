import React from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

const Button = (props) => {
  const { text, to, href, type, clickAction, extraClass, target } = props;

  return (
    <>
      {href && (
        <a
          href={href}
          role="button"
          target={target}
          className={`btn btn--${type}`}>
          {text}
        </a>
      )}
      {to && (
        <Link to={to} target={target} className={`btn btn--${type}`}>
          {text}
        </Link>
      )}
      {!href && !to && (
        <button
          className={`btn btn--${type} ${extraClass}`}
          onClick={clickAction}>
          {text}
        </button>
      )}
    </>
  );
};
export default Button;
