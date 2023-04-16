module.exports = `
  mainMenu {
    data {
      attributes {
        body {
          ... on ComponentMenuMenuLink {
            label
            url
          }
          ... on ComponentMenuMenuSection {
            Title
            menu_sections {
              data {
                attributes {
                  Label
                  Body {
                    ... on ComponentMenuMenuLink {
                    label
                    url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
