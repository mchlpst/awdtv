import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// import { ReactComponent as Magnifyglass } from "../../assets/svg/Magnifyglass.svg";

import "./MobileNavigation.scss";

const MobileNavigation = () => {
  const [data, setData] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  useEffect(() => {
    fetch(
      `https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com/api/menus/1?nested&populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.data.attributes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        {data && data.items && data.items.data && (
          <nav className="mobile-navigation__nav">
            {data.items.data.map((item, index) => {
              return item.attributes.children.data.length === 0 ? (
                <NavLink
                  key={index}
                  to={item.attributes.url}
                  onClick={() => setShowMenu(false)}
                  className="mobile-navigation__link mobile-navigation__link--primair">
                  {item.attributes.title}
                </NavLink>
              ) : (
                <DropdownSection
                  key={index}
                  label={item.attributes.title}
                  body={item.attributes.children.data}
                  closeMenu={() => setShowMenu(false)}
                  meunIsClosed={showMenu}
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
  useEffect(() => {
    setShow(false);
    setExpand(false);
  }, [props.meunIsClosed]);

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
                body={item.attributes.children.data}
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
              to={item.attributes.url}
              onClick={props.closeMenu}
              className="mobile-navigation__link main-navigation__link--secondair">
              {item.attributes.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
