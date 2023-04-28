const GridImages = require("../components/GridImages");
module.exports = `
homePage {
  data {
    attributes {
      content {
        ${GridImages}
      }
    }
  }
}
`;
