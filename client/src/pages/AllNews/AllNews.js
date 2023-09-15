import React, { useState, useContext, useEffect } from "react";
import { DatoContext } from "../../hooks/datoCMS";

import Hero from "../../components/Hero/Hero";

import "./AllNews.scss";

const AllNews = () => {
  const [data, setData] = useState(null);
  const [activeTags, setActiveTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.allArticles);
    }
  }, [context]);
  useEffect(() => {
    if (data) {
      const all = data.map((item) => item.tag);
      setTags(
        all.filter((value, index, self) => self.indexOf(value) === index)
      );
    }
  }, [data]);

  const replaceDash = (word) => {
    return word.replace(/-/g, " ");
  };

  useEffect(() => {
    if (activeTags.length === 0) {
      setFilteredItems(data);
    }
    console.log(data);
  }, [activeTags, data]);
  return (
    <main className="news">
      <Hero title="Nieuws" maxHeight />
      <section>
        <div>
          {tags.map((tag) => (
            <div>{replaceDash(tag)}</div>
          ))}
        </div>
        {filteredItems &&
          filteredItems.map((article) => <div>{article.title}</div>)}
      </section>
    </main>
  );
};
export default AllNews;
