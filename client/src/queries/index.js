import TopMenu from "./elements/TopMenu";
import MainMenu from "./elements/MainMenu";
import HomePage from "./pages/HomePage";
import AllArticles from "./models/AllArticles";

export const query = `{
  ${MainMenu}
  ${TopMenu}
  ${HomePage}
  ${AllArticles}
}`;
