import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import "./App.scss";

import MainNavigation from "./components/MainNavigation/MainNavigation";
import TopMenu from "./components/TopMenu/Topmenu";

const rawQuery = require("./queries/index");

const query = gql`
  ${rawQuery}
`;

const App = () => {
  const [content, setContent] = useState(null);

  const { loading, error, data } = useQuery(query);

  useEffect(() => {
    if (!loading && !error) {
      setContent({
        mainMenu: data.menusMenus.data.find(
          (item) => item.attributes.title === "MainMenu"
        ).attributes,
        topMenu: data.menusMenus.data.find(
          (item) => item.attributes.title === "TopMenu"
        ).attributes,
      });
    }
    // eslint-disable-next-line
  }, [loading]);

  return (
    <div className="App">
      {loading && <div>Loading</div>}
      {content && (
        <header className="App-header">
          <TopMenu data={content.topMenu} />
          <MainNavigation data={content.mainMenu} />
        </header>
      )}
    </div>
  );
};

export default App;
