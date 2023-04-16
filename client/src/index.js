import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const location = window.location;

const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_GRAPHQL_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const baseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:1337/graphql";
  } else {
    return location.origin;
  }
};
const httpLink = createHttpLink({
  uri: baseUrl,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
