import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Routes, Route } from "react-router-dom";

import "./scss/index.scss";
import "./App.scss";

import MainNavigation from "./components/MainNavigation/MainNavigation";
import TopMenu from "./components/TopMenu/Topmenu";
import HomePage from "./pages/HomePage/HomePage";

import { menuQuery, globalQuery } from "./queries";

const App = () => {
  const [menus, setMenus] = useState(null);
  const [globals, setGlobals] = useState(null);

  const {
    loading: menuQueryLoading,
    error: menuQueryError,
    data: menu,
  } = useQuery(menuQuery);
  const {
    loading: globalQueryLoading,
    error: globalQueryError,
    data: global,
  } = useQuery(globalQuery);

  useEffect(() => {
    if (!globalQueryLoading && !globalQueryError) {
      setGlobals(global.global.data.attributes);
    }
    if (!menuQueryLoading && !menuQueryError) {
      setMenus({
        topMenu: menu.topMenu.data.attributes,
        mainMenu: menu.mainMenu.data.attributes,
      });
    }
    // eslint-disable-next-line
  }, [globalQueryLoading, menuQueryLoading]);

  return (
    <div className="App">
      {menus && globals && (
        <header className="App-header">
          <TopMenu data={menus.topMenu} />
          <MainNavigation data={menus.mainMenu} globals={globals} />
        </header>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
