import TopMenu from "./elements/TopMenu";
import MainMenu from "./elements/MainMenu";
import HomePage from "./pages/HomePage";
import TrainingsScheme from "./pages/TrainingsScheme";
import BecomeMemberPage from "./pages/BecomeMemberPage";
import TeamsOverviewPage from "./pages/TeamsOverviewPage";
import ContactPage from "./pages/ContactPage";
import AllArticles from "./models/AllArticles";
import AllTeams from "./models/AllTeams";
import AllPages from "./models/AllPages";
import AllCalenders from "./models/AllCalenders";
import Footer from "./elements/Footer";
import General from "./General";

export const query = `{
  ${MainMenu}
  ${TopMenu}
  ${HomePage}
  ${AllArticles}
  ${BecomeMemberPage}
  ${TeamsOverviewPage}
  ${TrainingsScheme}
  ${AllTeams}
  ${AllPages}
  ${AllCalenders}
  ${ContactPage}
  ${Footer}
  ${General}
}`;
