import React, { useContext, useState, useEffect } from "react";
import { ClubDataContext } from "../../hooks/ClubData";
import { DatoContext } from "../../hooks/datoCMS";
import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";

import "./TeamsStats.scss";
import Hero from "../../components/Hero/Hero";
const TeamsStats = () => {
  const clubData = useContext(ClubDataContext);

  const [data, setData] = useState(null);
  const context = useContext(DatoContext);
  const [allFetched, setAllFetched] = useState(false);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch(
      `https://awdtv-cms-8c73f71b0b4d.herokuapp.com/api/teams-overview?populate[0]=Teams&populate[1]=Teams.TeamPhoto`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (clubData && data) {
      if (clubData.standings) {
        let res = clubData.standings.res;
        const teamName = res.map((item, index) => ({
          team: {
            name: item.team.name,
            ref_id: item.pools[0].ref_id,
            index: index,
            standings: null,
          },
        }));
        teamName.forEach((obj) => {
          let res = clubData.program;
          let matches = [];
          if (res) {
            res.res.map((item) => {
              item.matches.forEach((match) => {
                if (
                  match.teams.home.name === obj.team.name ||
                  match.teams.away.name === obj.team.name
                ) {
                  matches.push(match);
                  return;
                }
              });
              return false;
            });
            obj.team.program = matches;
          }
        });
        teamName.forEach((obj) => {
          let res = clubData.results;
          let matches = [];
          if (res) {
            res.res.map((item) => {
              item.matches.forEach((match) => {
                if (
                  match.teams.home.name === obj.team.name ||
                  match.teams.away.name === obj.team.name
                ) {
                  matches.push(match);
                  return;
                }
              });
              return false;
            });
            obj.team.results = matches.reverse();
          }
        });
        teamName.forEach((obj) => {
          if (data) {
            let cards = data.attributes.Teams;
            if (cards) {
              cards.forEach((card) => {
                if (obj.team.name === card.teamName) {
                  obj.team.background = card.TeamPhoto;
                }
              });
            }
          }
        });
        let updatedTeam = [];

        let update = new Promise((resolve, reject) => {
          updatedTeam.push(...teamName);
          teamName.forEach((obj, index, array) => {
            if (obj.team.ref_id) {
              fetch(
                `https://api-mijn.korfbal.nl/api/v2/matches/pools/${obj.team.ref_id}/standing`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              )
                .then((res) => {
                  if (res.ok) {
                    return res.json();
                  } else {
                    throw new Error(`error with status ${res.status}`);
                  }
                })
                .then((res) => {
                  const addStandings = {
                    ...updatedTeam[index].team,
                    standings: res,
                  };
                  updatedTeam.splice(index, 1, addStandings);
                });
            }
            if (index === array.length - 1) resolve();
          });
        });
        update.then(() => {
          setStats(updatedTeam);
          setTimeout(() => {
            setAllFetched(true);
          }, 3000);
        });
      }
    }
    // eslint-disable-next-line
  }, [clubData, data]);

  useEffect(() => {
    setAllFetched(false);
    setTimeout(() => {
      setAllFetched(true);
    }, 3000);
  }, [stats]);

  return (
    <main className="teams-overview">
      {data && (
        <>
          <Hero
            title={data.attributes.PageTitle}
            description={data.attributes.PageSubtitle}
          />
          <Grid>
            <Column col={12}>
              <section className="teams-overview__card-container">
                {stats && allFetched ? (
                  stats.map((item) => <Card item={item} key={item.name} />)
                ) : (
                  <div>Laden</div>
                )}
              </section>
            </Column>
          </Grid>
        </>
      )}
    </main>
  );
};
export default TeamsStats;

const Card = (item) => {
  const [activeTab, setActiveTab] = useState("standings");
  const [background, setBackground] = useState("");

  const handleTabs = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (item.item.background) {
      setBackground(item.item.background.data.attributes);
    }
  }, [item]);
  return (
    <div className="teams-overview__card" key={item.item.name}>
      <div className="teams-overview__card-header">
        <div className="teams-overview__card-background">
          {item.item.background ? (
            <img
              src={background.url}
              alt={background.alternativeText}
              className="teams-overview__card-background-image"
            />
          ) : (
            <div className="teams-overview__card-background-fallback"></div>
          )}
          {item.item.name && (
            <h3 className="teams-overview__card-title">{item.item.name}</h3>
          )}
        </div>
      </div>
      <div className="teams-overview__card-body">
        <div className="teams-overview__card-tab-container">
          {item.item.standings && (
            <div
              className={`teams-overview__card-tab ${
                activeTab === "standings"
                  ? "teams-overview__card-tab--active"
                  : ""
              }`}
              onClick={() => handleTabs("standings")}>
              Stand
            </div>
          )}
          {item.item.program && (
            <div
              className={`teams-overview__card-tab ${
                activeTab === "program"
                  ? "teams-overview__card-tab--active"
                  : ""
              }`}
              onClick={() => handleTabs("program")}>
              Programma
            </div>
          )}
          {item.item.results && (
            <div
              className={`teams-overview__card-tab ${
                activeTab === "results"
                  ? "teams-overview__card-tab--active"
                  : ""
              }`}
              onClick={() => handleTabs("results")}>
              Uitslagen
            </div>
          )}
        </div>
        <div className="teams-overview__card-content">
          {activeTab === "standings" && (
            <StaningsTable data={item.item.standings} />
          )}
          {activeTab === "program" && <ProgramTable data={item.item.program} />}
          {activeTab === "results" && <ResultsTable data={item.item.results} />}
        </div>
      </div>
    </div>
  );
};

const StaningsTable = (props) => {
  return (
    <>
      {props.data && props.data !== undefined && (
        <div className="teams-overview__standings">
          <div className="teams-overview__standings-table">
            <div className="teams-overview__standings-table-head">
              <div className="teams-overview__standings-table-col">Team</div>
              <div className="teams-overview__standings-table-col">W</div>
              <div className="teams-overview__standings-table-col">G</div>
              <div className="teams-overview__standings-table-col">V</div>
              <div className="teams-overview__standings-table-col">DS</div>
              <div className="teams-overview__standings-table-col">P</div>
            </div>
            {props.data[0].standings.map((team, index) => (
              <div className="teams-overview__standings-table-row" key={index}>
                <div className="teams-overview__standings-table-col">
                  {team.team.name}
                </div>
                <div className="teams-overview__standings-table-col">
                  {team.stats.won}
                </div>
                <div className="teams-overview__standings-table-col">
                  {team.stats.draw}
                </div>
                <div className="teams-overview__standings-table-col">
                  {team.stats.lost}
                </div>
                <div className="teams-overview__standings-table-col">
                  {team.stats.goals.difference}
                </div>
                <div className="teams-overview__standings-table-col">
                  {team.stats.points}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const ProgramTable = (props) => {
  const wordBreak = (word) => {
    let index = word.indexOf("/");
    if (index !== -1) {
      let wrappedWord = word.slice(0, index) + " " + word.slice(index);
      return wrappedWord;
    } else {
      return word;
    }
  };
  return (
    <div className="teams-overview__program-table">
      <div className="teams-overview__program-table-head">
        <div className="teams-overview__program-table-col">Datum</div>
        <div className="teams-overview__program-table-col">Tijd</div>
        <div className="teams-overview__program-table-col">Thuis</div>
        <div className="teams-overview__program-table-col"></div>
        <div className="teams-overview__program-table-col">Uit</div>
      </div>
      {props.data.map((game, index) => (
        <div className="teams-overview__program-table-row" key={index}>
          <div className="teams-overview__program-table-col">
            {new Date(game.date).toLocaleString("nl-NL", {
              weekday: "short",
              day: "numeric",
              month: "numeric",
            })}
          </div>
          <div className="teams-overview__program-table-col">
            {new Date(game.date).toLocaleString("nl-NL", {
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
          <div className="teams-overview__program-table-col">
            <span
              className={game.teams.home.name.includes("AWDTV") ? "red" : ""}>
              {wordBreak(game.teams.home.name)}
            </span>
          </div>
          <div className="teams-overview__program-table-col">vs.</div>
          <div className="teams-overview__program-table-col">
            <span
              className={game.teams.away.name.includes("AWDTV") ? "red" : ""}>
              {wordBreak(game.teams.away.name)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
const ResultsTable = (props) => {
  const wordBreak = (word) => {
    let index = word.indexOf("/");
    if (index !== -1) {
      let wrappedWord = word.slice(0, index) + " " + word.slice(index);
      return wrappedWord;
    } else {
      return word;
    }
  };
  return (
    <div className="teams-overview__results-table">
      {props.data &&
        props.data.map((match) => (
          <div className="teams-overview__results-match">
            <div className="teams-overview__results-date">
              {new Date(match.date).toLocaleString("nl-NL", {
                weekday: "short",
                day: "numeric",
                month: "numeric",
              })}
            </div>
            {match.stats ? (
              <div className="teams-overview__results-game">
                <div className="teams-overview__results-score">
                  {match.stats.home.score}
                </div>
                <div className="teams-overview__results-score">
                  {match.stats.away.score}
                </div>
              </div>
            ) : (
              <div className="teams-overview__results-game">
                {match.status.game}
              </div>
            )}
            <div className="teams-overview__results-game">
              <div className="teams-overview__results-team">
                {wordBreak(match.teams.home.name)}
              </div>
              <div className="teams-overview__results-team">
                {wordBreak(match.teams.away.name)}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
