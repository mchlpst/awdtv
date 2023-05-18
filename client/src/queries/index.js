import TopMenu from "./elements/TopMenu";
import MainMenu from "./elements/MainMenu";
import HomePage from "./pages/HomePage";

export const query = `{
  ${MainMenu}
  ${TopMenu}
  ${HomePage}
}`;
