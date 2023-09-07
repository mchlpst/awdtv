const Image = require("../elements/Image");

module.exports = `
teamsOverview {
  pageTitle
  slug
  pageSubtitle
  cards {
    teamName
    teamPhoto {
      ${Image}
      }
    }
  }
`;
