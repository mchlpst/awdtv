import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DatoContext } from "../../hooks/datoCMS";

import { ReactComponent as Chevron } from "../../assets/svg/Chevron.svg";
import { ReactComponent as Magnifyglass } from "../../assets/svg/Magnifyglass.svg";
import "./MainNavigation.scss";
import { useViewport } from "../../hooks/useViewport";

const MainNavigation = (props) => {
  const [data, setData] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const context = useContext(DatoContext);
  const { isLaptop } = useViewport({
    mobile: 480,
    tablet: 768,
    laptop: 1024,
    desktop: 1200,
  });

  const handlePosition = () => {
    const topMenu = document.getElementsByClassName("top-menu");
    const offsetHeight = topMenu[0].getBoundingClientRect().height;
    if (window.scrollY >= offsetHeight && window.scrollY !== 0) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    if (context) {
      setData(context.allMainNavigations);
    }
  }, [context]);
  useEffect(() => {
    handlePosition();
    window.addEventListener("scroll", handlePosition);
    return () => {
      window.removeEventListener("scroll", handlePosition);
    };
  }, []);

  const toggleFocus = () => {
    if (isLaptop) {
      setIsFocused(!isFocused);
    }
  };

  return (
    <nav
      className={`main-navigation ${isFixed ? "main-navigation--fixed" : ""}`}>
      <div className="main-navigation__grid">
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
        <div
          className={`main-navigation__search-container ${
            isFocused ? "main-navigation__search-container--focus" : ""
          }`}>
          <div className="main-navigation__search">
            <input
              type="text"
              className="main-navigation__search-input"
              placeholder="Op zoek naar..."
              onBlur={() => toggleFocus()}
            />
            <Magnifyglass
              className="main-navigation__search-icon"
              onClick={() => toggleFocus()}
            />
          </div>
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
