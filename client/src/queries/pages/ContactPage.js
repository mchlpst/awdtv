const Image = require("../elements/Image");

module.exports = `
contact {
  title
  handigeLinks {
    link {
      ... on ArticleRecord {
        slug
      }
    }
    linkLabel
    url
  }
  slug
  address
  background {
    ${Image}
  }
}
`;
