import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import "./scss/index.scss";
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
      console.log(data);
      setContent({
        mainMenu: data.mainMenu.data.attributes,
        topMenu: data.topMenu.data.attributes,
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
