module.exports = `
query getMenus {
  menusMenus {
    data {
      attributes {
        title
        items {
          data {
            attributes {
              title
              url
              parent {
                data {
                  attributes {
                    title
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
