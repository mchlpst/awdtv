import TopMenu from "./elements/TopMenu";
import MainMenu from "./elements/MainMenu";
import HomePage from "./pages/HomePage";
import AllArticles from "./models/AllArticles";
import AllTeams from "./models/AllTeams";

export const query = `{
  ${MainMenu}
  ${TopMenu}
  ${HomePage}
  ${AllArticles}
  ${AllTeams}
}`;
