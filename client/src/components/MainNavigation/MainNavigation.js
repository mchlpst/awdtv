import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as Chevron } from "../../assets/svg/Chevron.svg";
import "./MainNavigation.scss";

const MainNavigation = (props) => {
  let data = props.data;
  return (
    <nav className="main-navigation">
      {data.body.map((item, index) => {
        return item.url ? (
          <NavLink
            key={index}
            to={item.url}
            className="main-navigation__link main-navigation__link--primair-level">
            {item.label}
          </NavLink>
        ) : (
          <DropdownSection
            key={index}
            title={item.Title}
            body={item.menu_sections}
          />
        );
      })}
    </nav>
  );
};

const DropdownSection = (props) => {
  return (
    <>
      <div className="main-navigation__dropdown-section__label-container">
        <p className="main-navigation__dropdown-section__label">
          {props.title}
        </p>
        <Chevron className="main-navigation__dropdown-section__icon" />
      </div>
      <div className="main-navigation__dropdown-section">
        <div className="main-navigation__dropdown-section__container">
          {props.body.data.map((item, index) => {
            return (
              <DropDown
                key={index}
                body={item.attributes.Body}
                label={item.attributes.Label}
              />
            );
          })}
        </div>
        <span className="main-navigation__dropdown-section__background-text">
          {props.title}
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
              to={item.url}
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
