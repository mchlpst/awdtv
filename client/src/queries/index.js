import { gql } from "@apollo/client";

const getMainMenu = require("./getMainMenu");
const getTopMenu = require("./getTopMenu");
const getGlobal = require("./getGlobal");

export const menuQuery = gql`
query getMenus {
  ${getMainMenu}
  ${getTopMenu}
}
`;
export const globalQuery = gql`
query getGlobal {
  ${getGlobal}
}
`;
