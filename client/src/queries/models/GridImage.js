const Image = require("../elements/Image");

module.exports = `
... on ImageGridRecord {
  mainBlockLink
  secondairBlockLink
  mainBlockLinkLabel
  secondairBlockLinkLabel
  mainBlockTitle
  secondairBlockTitle
  mainBlockImage {
    ${Image}
  }
  secondairBlockImage {
    ${Image}
  }
  tetiairBlockImage {
    ${Image}
  }
  _modelApiKey
  articles {
    title
    slug
    visual {
      ${Image}
    }
  }
} 
`;
