import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/index.scss";
import "./App.scss";

import MainNavigation from "./components/MainNavigation/MainNavigation";
import TopMenu from "./components/TopMenu/Topmenu";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TopMenu />
        <MainNavigation />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
