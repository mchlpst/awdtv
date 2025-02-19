import React, { useEffect, createContext, useState } from "react";

export const FetchContentContext = createContext();

export const FetchContentProvider = ({ children }) => {
  const [articles, setArticles] = useState();

  useEffect(() => {
    fetch();
  });
};
