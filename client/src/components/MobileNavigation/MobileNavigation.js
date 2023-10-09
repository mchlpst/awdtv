import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DatoContext } from "../../hooks/datoCMS";

// import { ReactComponent as Magnifyglass } from "../../assets/svg/Magnifyglass.svg";

import "./MobileNavigation.scss";

const MobileNavigation = () => {
  const [data, setData] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.allMainNavigations);
    }
  }, [context]);

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <section className="mobile-navigation">
      <a href="/" className="mobile-navigation__logo-link">
        <img
          src="/Logo.webp"
          alt="Logo AW.DTV"
          className="mobile-navigation__logo"
        />
      </a>
      <div
        className={`mobile-navigation__hamburger-container ${
          showMenu ? "mobile-navigation__hamburger-container--show" : ""
        }`}
        onClick={() => toggleShowMenu()}>
        <div className="mobile-navigation__bar"></div>
        <div className="mobile-navigation__bar"></div>
      </div>
      <div
        className={`mobile-navigation__container ${
          showMenu ? "mobile-navigation__container--show" : ""
        }`}>
        {data && (
          <nav className="mobile-navigation__nav">
            {data.map((item, index) => {
              return item.children.length === 0 ? (
                <NavLink
                  key={index}
                  to={item.link}
                  onClick={() => setShowMenu(false)}
                  className="mobile-navigation__link mobile-navigation__link--primair">
                  {item.label}
                </NavLink>
              ) : (
                <DropdownSection
                  key={index}
                  label={item.label}
                  body={item.children}
                  closeMenu={() => setShowMenu(false)}
                />
              );
            })}
          </nav>
        )}
      </div>
    </section>
  );
};
export default MobileNavigation;

const DropdownSection = (props) => {
  const [expand, setExpand] = useState(false);
  const [show, setShow] = useState(false);

  const toggleExpand = () => {
    if (expand) {
      setShow(false);
      setTimeout(() => {
        setExpand(false);
      }, 200);
    } else {
      setExpand(true);
      setTimeout(() => {
        setShow(true);
      }, 200);
    }
  };
  return (
    <>
      <div
        className="mobile-navigation__dropdown-section-label-container"
        onClick={() => toggleExpand()}>
        <p className="mobile-navigation__dropdown-section-label">
          {props.label}
        </p>
        <div
          className={`mobile-navigation__expand-icon ${
            expand ? "mobile-navigation__expand-icon--expand" : ""
          }`}>
          <div className="mobile-navigation__expand-bar"></div>
          <div className="mobile-navigation__expand-bar"></div>
        </div>
      </div>
      <div
        className={`mobile-navigation__dropdown-section ${
          expand ? "mobile-navigation__dropdown-section--expand" : ""
        }`}>
        <div
          className={`mobile-navigation__dropdown-section-container ${
            show ? "mobile-navigation__dropdown-section-container--show" : ""
          }`}>
          {props.body.map((item, index) => {
            return (
              <DropDown
                key={index}
                body={item.children}
                label={item.label}
                closeMenu={props.closeMenu}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const DropDown = (props) => {
  return (
    <div className="mobile-navigation__dropdown">
      <p className="mobile-navigation__dropdown__label">{props.label}</p>
      <div className="mobile-navigation__dropdown__container">
        {props.body.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.link}
              onClick={props.closeMenu}
              className="mobile-navigation__link main-navigation__link--secondair">
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
