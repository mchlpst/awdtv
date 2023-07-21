import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/index.scss";
import "./App.scss";

import MainNavigation from "./components/MainNavigation/MainNavigation";
import TopMenu from "./components/TopMenu/Topmenu";
import HomePage from "./pages/HomePage/HomePage";
import SlugPage from "./pages/SlugPage/SlugPage";
import TeamPage from "./pages/TeamPage/TeamPage";
import BecomeMember from "./pages/BecomeMember/BecomeMember";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TopMenu />
        <MainNavigation />
      </header>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/teams/:team" exact element={<TeamPage />} />
        <Route path="/lid-worden" exact element={<BecomeMember />} />
        <Route path="/:slug" element={<SlugPage />} />
      </Routes>
    </div>
  );
};

export default App;
