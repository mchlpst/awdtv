const now = new Date();

module.exports = `
allCalenders(filter: {eventDate: {gte:"${now}"}}) {
  title 
   eventDate 
   location
   articleLink {
    ... on ArticleRecord {
      slug
    }
    ... on PageRecord {
      slug
    }
  }
}
`;
