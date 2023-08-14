const Image = require("../elements/Image");

module.exports = `
footer {
  columns {
    ... on FooterLinkColumnRecord {
      title
      text
      links {
        url
        link {
          ... on ArticleRecord {
            slug
          }
          ... on LidWordenRecord {
            slug
          }
        }
        linkLabel
      }
    }
  }
  sponsoren {
   ${Image}
    url
    alt
  }
  facebookLink
  twitterLink
  instagramLink
  tiktokLink
  youtubeLink
  hoofdsponser {
    ${Image}
    url
    alt
  }
}
`;
