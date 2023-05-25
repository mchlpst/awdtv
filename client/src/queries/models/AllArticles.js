const Image = require("../elements/Image");

module.exports = `
allArticles {
  slug
  title
  date
  content(markdown: false)
  position
  visual {
    responsiveImage(imgixParams: {auto: compress}) {
      srcSet
      src
      height
      alt
      aspectRatio
      width
    }
  }
  _modelApiKey
}

`;
