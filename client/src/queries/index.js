const getMainMenu = require("./getMainMenu");
const getTopMenu = require("./getTopMenu");

module.exports = `
query getMenus {
  ${getMainMenu}
  ${getTopMenu}
}
`;
