const Image = require("../elements/Image");

module.exports = `
allArticles {
  slug
  title
  date
  tag
  content(markdown: false)
  position
  visual {
    ${Image}
  }
  _modelApiKey
}`;
