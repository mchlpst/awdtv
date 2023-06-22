import React, { useContext, useState, useEffect } from "react";

import { ClubDataContext } from "../../hooks/ClubData";

import "./CompetitionTable.scss";

const CompetitionTable = () => {
  const clubData = useContext(ClubDataContext);

  const [teamsArr, setTeamsArr] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedStats, setSelectedStats] = useState(null);
  const [teamStanding, setTeamStanding] = useState(null);
  const [teamProgram, setTeamProgram] = useState(null);
  const [teamResults, setTeamResults] = useState(null);

  const translateText = (source) => {
    let translation;
    switch (source) {
      case "results":
        translation = "Uitslagen";
        break;
      case "program":
        translation = "Programma";
        break;
      case "standings":
        translation = "Stand";
        break;
      default:
        translation = null;
        break;
    }
    return translation;
  };

  useEffect(() => {
    if (clubData) {
      if (clubData.standings) {
        let res = clubData.standings.res;
        let teams = [];
        res.forEach((team) => {
          teams.push(team.team.name);
        });
        setTeamsArr(teams);
        setSelectedTeam(teams[0]);

        setSelectedStats(Object.keys(clubData)[0]);
      }
      console.log(clubData);
    }
  }, [clubData]);
  useEffect(() => {
    if (clubData) {
      if (clubData.standings) {
        let res = clubData.standings;
        let filteredObject = res.res.find((obj) => {
          for (let key in obj) {
            if (typeof obj[key] === "object" && obj[key] !== null) {
              if (obj[key].name === selectedTeam) {
                return true;
              }
            }
          }
          return false;
        });

        let ref;
        if (
          filteredObject &&
          filteredObject.pools.length > 0 &&
          filteredObject.pools[0].ref_id
        ) {
          ref = filteredObject.pools[0].ref_id;
        } else {
          ref = null;
        }
        if (ref) {
          fetch(
            `https://api-mijn.korfbal.nl/api/v2/matches/pools/${ref}/standing`,
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
              setTeamStanding(res);
            });
        }
      }
      if (clubData.program) {
        let res = clubData.program;
        let matches = [];
        if (res) {
          res.res.map((item) => {
            item.matches.forEach((match) => {
              if (
                match.teams.home.name === selectedTeam ||
                match.teams.away.name === selectedTeam
              ) {
                matches.push(match);
              }
            });
            return false;
          });
          setTeamProgram(matches);
        }
      }
      if (clubData.results) {
        let res = clubData.results;
        let matches = [];
        if (res) {
          res.res.map((item) => {
            item.matches.forEach((match) => {
              if (
                match.teams.home.name === selectedTeam ||
                match.teams.away.name === selectedTeam
              ) {
                console.log(match);
                matches.push(match);
              }
            });
            return false;
          });
          setTeamResults(matches);
        }
      }
    }
    // eslint-disable-next-line
  }, [selectedTeam, selectedStats]);
  return (
    <section className="competition-table">
      {teamsArr.length > 0 && (
        <>
          <div className="competition-table__tab-container">
            {clubData.standings && (
              <div
                className={
                  "competition-table__tab" +
                  (selectedStats === Object.keys(clubData)[0]
                    ? " competition-table__tab--active"
                    : "")
                }
                onClick={() => setSelectedStats(Object.keys(clubData)[0])}>
                {translateText(Object.keys(clubData)[0])}
              </div>
            )}
            {clubData.results && (
              <div
                className={
                  "competition-table__tab" +
                  (Object.keys(clubData)[1] === selectedStats
                    ? " competition-table__tab--active"
                    : "")
                }
                onClick={() => setSelectedStats(Object.keys(clubData)[1])}>
                {translateText(Object.keys(clubData)[1])}
              </div>
            )}
            {clubData.program && (
              <div
                className={
                  "competition-table__tab" +
                  (Object.keys(clubData)[2] === selectedStats
                    ? " competition-table__tab--active"
                    : "")
                }
                onClick={() => setSelectedStats(Object.keys(clubData)[2])}>
                {translateText(Object.keys(clubData)[2])}
              </div>
            )}
          </div>
          <div className="competition-table__selected-container">
            {selectedTeam}
          </div>
          <div className="competition-table__dropdown">
            {teamsArr.map((team) => {
              return (
                <div
                  className="competition-table__dropdown-item"
                  data-value={team}
                  onClick={() => setSelectedTeam(team)}
                  key={team}>
                  {team}
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="competition-table__content-wrapper">
        {selectedStats === "standings" && (
          <div className="competition-table__content-table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>G</th>
                  <th>Pts</th>
                  <th>+/-</th>
                </tr>
              </thead>
              <tbody>
                {teamStanding &&
                  teamStanding[0].standings.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.stats.position}</td>
                        <td>{item.team.name}</td>
                        <td>{item.stats.played}</td>
                        <td>{item.stats.points}</td>
                        <td>{item.stats.goals.difference}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        {selectedStats === "program" && (
          <div className="competition-table__content-table">
            {teamProgram.length > 0 ? (
              <div>
                {teamProgram.map((match) => {
                  return (
                    <div key={match.date}>
                      <div>
                        {new Date(match.date).toLocaleString("nl-NL", {
                          weekday: "short",
                          day: "numeric",
                          month: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </div>
                      <div>{match.teams.home.name}</div>
                      <div>{match.teams.away.name}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>Geen geplande wedstrijden</div>
            )}
          </div>
        )}
        {selectedStats === "results" && (
          <div className="competition-table__content-table">
            {teamResults && (
              <div>
                {teamResults.map((match) => {
                  return (
                    <div key={match.date}>
                      <div>
                        {new Date(match.date).toLocaleString("nl-NL", {
                          weekday: "short",
                          day: "numeric",
                          month: "numeric",
                        })}
                      </div>
                      <div>{match.teams.home.name}</div>
                      <div>{match.teams.away.name}</div>
                      {match.stats ? (
                        <div>
                          {match.stats.home.score} - {match.stats.away.score}
                        </div>
                      ) : (
                        <div>{match.status.game}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
export default CompetitionTable;
