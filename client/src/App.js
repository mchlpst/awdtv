import React, { useState, useEffect, useContext } from "react";
import { DatoContext } from "./hooks/datoCMS";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

import MainNavigation from "./components/MainNavigation/MainNavigation";
import TopMenu from "./components/TopMenu/Topmenu";
import HomePage from "./pages/HomePage/HomePage";
import SlugPage from "./pages/SlugPage/SlugPage";
import TeamPage from "./pages/TeamPage/TeamPage";
import TeamsStats from "./pages/TeamsStats/TeamsStats";
import BecomeMember from "./pages/BecomeMember/BecomeMember";
import ContactPage from "./pages/ContactPage/ContactPage";
import AllNews from "./pages/AllNews/AllNews";
import Footer from "./components/Footer/Footer";
import { useViewport } from "./hooks/useViewport";
import MobileNavigation from "./components/MobileNavigation/MobileNavigation";

const App = () => {
  const { isMobile, isTablet } = useViewport({
    mobile: 480,
    tablet: 768,
    laptop: 1024,
    desktop: 1200,
  });

  const context = useContext(DatoContext);
  const [global, setGlobal] = useState(null);

  useEffect(() => {
    if (context) {
      setGlobal(context._site);
    }
  }, [context]);

  useEffect(() => {
    if (global) {
      const link = document.querySelector("link[rel~='icon']");

      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = global.favicon.responsiveImage.src;
    }
  }, [global]);

  return (
    <div className="App">
      <header className="App-header">
        {!isTablet && !isMobile && (
          <>
            <TopMenu />
            <MainNavigation />
          </>
        )}
        {(isTablet || isMobile) && <MobileNavigation />}
      </header>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/teams/:team" exact element={<TeamPage />} />
        <Route path="/lid-worden" exact element={<BecomeMember />} />
        <Route path="/contact" exact element={<ContactPage />} />
        <Route path="/overzicht" exact element={<TeamsStats />} />
        <Route path="/nieuws" exact element={<AllNews />} />

        <Route path="/:slug" element={<SlugPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
