import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DatoContext } from "../../hooks/datoCMS";

import { ReactComponent as Chevron } from "../../assets/svg/Chevron.svg";
import { ReactComponent as Magnifyglass } from "../../assets/svg/Magnifyglass.svg";
import "./MainNavigation.scss";

const MainNavigation = (props) => {
  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.allMainNavigations);
    }
  }, [context]);

  return (
    <nav className="main-navigation">
      <a href="/" className="main-navigation__logo-link">
        <img
          src="/Logo.webp"
          alt="Logo AW.DTV"
          className="main-navigation__logo"
        />
      </a>
      {data &&
        data.map((item, index) => {
          return item.children.length === 0 ? (
            <NavLink
              key={index}
              to={item.link}
              className="main-navigation__link main-navigation__link--primair">
              {item.label}
            </NavLink>
          ) : (
            <DropdownSection
              key={index}
              label={item.label}
              body={item.children}
            />
          );
        })}
      <div className="main-navigation__search-container">
        <div className="main-navigation__search">
          <input
            type="text"
            className="main-navigation__search-input"
            placeholder="Op zoek naar..."
          />
          <Magnifyglass className="main-navigation__search-icon" />
        </div>
      </div>
    </nav>
  );
};

const DropdownSection = (props) => {
  return (
    <>
      <div className="main-navigation__dropdown-section__label-container">
        <p className="main-navigation__dropdown-section__label">
          {props.label}
        </p>
        <Chevron className="main-navigation__dropdown-section__icon" />
      </div>
      <div className="main-navigation__dropdown-section">
        <div className="main-navigation__dropdown-section__container">
          {props.body.map((item, index) => {
            return (
              <DropDown key={index} body={item.children} label={item.label} />
            );
          })}
        </div>
        <span className="main-navigation__dropdown-section__background-text">
          {props.label}
        </span>
      </div>
    </>
  );
};

const DropDown = (props) => {
  return (
    <div className="main-navigation__dropdown">
      <p className="main-navigation__dropdown__label">{props.label}</p>
      <div className="main-navigation__dropdown__container">
        {props.body.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.link}
              className="main-navigation__link main-navigation__link--secondair">
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MainNavigation;
