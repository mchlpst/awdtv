const Image = require("../elements/Image");

module.exports = `
allTeams {
  _modelApiKey
  link
  team
  players {
    name
    photo {
      ${Image}
    }
    number
  }
  staff {
    name
    photo {
      ${Image}
    }
    function
  }
  background {
    ${Image}
  }
}`;
