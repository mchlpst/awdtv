const Image = require("../elements/Image");

module.exports = `
allPages {
  slug
    title
    visual {
      ${Image}
    }
    attachments {
      filename
      ${Image}
      url
    }
    content
    _modelApiKey
}
`;
