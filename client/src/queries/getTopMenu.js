module.exports = `
  topMenu {
		data {
      attributes {
        Body {
          ... on ComponentMenuMenuLink {
            label
            url
          }
        }
      }
    }
  }
`;
