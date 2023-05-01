const Image = require("../global/Image");

module.exports = `
... on ComponentLayoutGridImages {
  __typename
  ButtonLink1
  ButtonLink2
  ButtonLink3
  ButtonLabel1
  ButtonLabel2
  ButtonLabel3
  Title1
  Title2
  Title3
  Image1 {
    ${Image}
  }
  Image2 {
    ${Image}
  }
  Image3 {
    ${Image}
  }
  Articles {
    data {
      attributes {
        Title
        slug
        Image {
          ${Image}
        }
      }
    }
  }
}
`;
