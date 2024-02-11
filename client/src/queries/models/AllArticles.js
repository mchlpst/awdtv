const Image = require("../elements/Image");

module.exports = `
allArticles(first: 100, orderBy: _publishedAt_DESC) {
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
