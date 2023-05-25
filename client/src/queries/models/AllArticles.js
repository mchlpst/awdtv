const Image = require("../elements/Image");

module.exports = `
allArticles {
  slug
  title
  date
  content(markdown: false)
  position
  visual {
    ${Image}
  }
  _modelApiKey
}

`;
