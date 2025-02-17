import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import Chevron from "../../assets/svg/Chevron.svg?react";
import Magnifyglass from "../../assets/svg/Magnifyglass.svg?react";
import "./MainNavigation.scss";
import { useViewport } from "../../hooks/useViewport";

const MainNavigation = (props) => {
  const [data, setData] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
    fetch(
      `https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com/api/menus/1?nested&populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
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
        <Link to="/" className="main-navigation__logo-link">
          <img
            src="/Logo.webp"
            alt="Logo AW.DTV"
            className="main-navigation__logo"
          />
        </Link>
        {data &&
          data.items.data.map((item, index) => {
            return item.attributes.children.data.length === 0 ? (
              <NavLink
                key={index}
                to={item.attributes.url}
                className="main-navigation__link main-navigation__link--primair">
                {item.attributes.title}
              </NavLink>
            ) : (
              <DropdownSection
                key={index}
                label={item.attributes.title}
                body={item.attributes.children.data}
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
              <DropDown
                key={index}
                body={item.attributes.children.data}
                label={item.attributes.title}
              />
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
              to={item.attributes.url}
              className="main-navigation__link main-navigation__link--secondair">
              {item.attributes.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MainNavigation;
