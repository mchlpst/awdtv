module.exports = `
topNavigation {
  content {
    url
    linkLabel
    link {
      ... on ArticleRecord {
        slug
      }
      ... on ContactRecord {
        slug
      }
    }
  }
}
`;
