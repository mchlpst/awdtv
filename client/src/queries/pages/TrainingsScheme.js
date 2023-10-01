const Image = require("../elements/Image");

module.exports = `
trainingSchemePage {
  title
  visual {
    ${Image}
  }
  content {
    ... on TrainingSchemeBlockRecord {
      schemeType
      content
    }
  }
}
`;
