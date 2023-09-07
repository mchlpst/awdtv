import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { DatoContext } from "../../hooks/datoCMS";

import "./TeamPage.scss";
import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";

const TeamPage = (props) => {
  const { team } = useParams();

  const [data, setData] = useState(null);
  const [selectedItems, setSelectedItems] = useState("players");
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      console.log(context.allTeams, team);
      let selectedTeam = context.allTeams.find((item) => {
        return item.link === team;
      });
      setData(selectedTeam);
      console.log(data);
    }
    // eslint-disable-next-line
  }, [context]);

  return (
    <main>
      {data && (
        <section className="team-page">
          <div className="team-page__header-container">
            <h1 className="team-page__title">{data.team}</h1>
            <div className="team-page__header-background">
              <img
                src={data.background.responsiveImage.srcSet}
                alt={data.background.responsiveImage.alt}
              />
            </div>
          </div>
          <Grid>
            <Column col={12}>
              <section className="team-page__content-wrapper">
                <div className="team-page__filter-container">
                  {data.players.length !== 0 && (
                    <>
                      <div
                        className={`team-page__filter-item ${
                          selectedItems === "players"
                            ? " team-page__filter-item--active"
                            : ""
                        }`}
                        onClick={() => setSelectedItems("players")}>
                        Spelers
                      </div>

                      <div
                        className={`team-page__filter-item ${
                          selectedItems === "staff"
                            ? " team-page__filter-item--active"
                            : ""
                        }`}
                        onClick={() => setSelectedItems("staff")}>
                        Staf
                      </div>
                    </>
                  )}
                </div>
                <div className="team-page__content-container">
                  {selectedItems === "players" && (
                    <>
                      {data.players.map((item, index) => (
                        <Player content={item} key={index} />
                      ))}
                    </>
                  )}
                  {selectedItems === "staff" && (
                    <>
                      {data.staff.map((item, index) => (
                        <Staff content={item} key={index} />
                      ))}
                    </>
                  )}
                </div>
              </section>
            </Column>
          </Grid>
        </section>
      )}
    </main>
  );
};

export default TeamPage;

const Player = (props) => {
  return (
    <div className="team-page__player">
      <img
        className="team-page__player-image"
        src={props.content.photo.responsiveImage.srcSet}
        alt={props.content.photo.responsiveImage.alt}
      />
      <div className="team-page__player-info-container">
        <div className="team-page__player-number">{props.content.number}</div>
        <div
          className="team-page__player-name"
          dangerouslySetInnerHTML={{ __html: props.content.name }}></div>
      </div>
    </div>
  );
};
const Staff = (props) => {
  return (
    <div className="team-page__staff">
      <img
        className="team-page__staff-image"
        src={props.content.photo.responsiveImage.srcSet}
        alt={props.content.photo.responsiveImage.alt}
      />
      <div className="team-page__staff-info-container">
        <div className="team-page__staff-name">{props.content.name}</div>
        <div className="team-page__staff-function">
          {props.content.function}
        </div>
      </div>
    </div>
  );
};
