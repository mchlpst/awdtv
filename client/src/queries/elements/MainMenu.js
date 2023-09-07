module.exports = `
allMainNavigations(filter: {parent: {exists: "*"}}, orderBy: position_ASC) {
  ... on MainNavigationRecord {
    id
    label
    link
    _status
    parent {
      id
      label
    }
    children {
      id
      label
      link
      children {
        id
        label
        link
      }
    }
  }
}
`;
