const GridImage = require("../models/GridImage");
const InstagramBlock = require("../models/InstagramBlock");

module.exports = `
home {
  content {
    ${GridImage}
    ${InstagramBlock}
  }
}
`;
