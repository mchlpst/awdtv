const Image = require("../elements/Image");

module.exports = `
allArticles(orderBy: _publishedAt_DESC, first: 100) {
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
