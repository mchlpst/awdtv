import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  const [posts, setPosts] = useState({});
  const [pages, setPages] = useState({});

  useEffect(() => {
    async function fetchData() {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      };
      const posts = await axios("/posts", axiosConfig);
      setPosts(posts);
      const pages = await axios("/pages", axiosConfig);
      setPages(pages);
    }
    fetchData();
  }, []);
  console.log(posts, pages);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
