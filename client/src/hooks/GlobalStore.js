import React, { createContext, useReducer, useContext } from "react";

export const GlobalStoreContext = createContext();

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROPERTY":
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

const initialObj = {
  currentPage: null,
  currentArticle: null,
  passwordNeeded: false,
};

export const GlobalStoreProvider = ({
  children,
  initialState = initialObj,
}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = () => useContext(GlobalStoreContext);
