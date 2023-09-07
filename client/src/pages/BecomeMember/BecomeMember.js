import React, { useEffect, useState, useContext } from "react";
import { DatoContext } from "../../hooks/datoCMS";
import SubscribeForm from "../../components/SubscribeForm/Subscribeform";
import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";

import "./BecomeMember.scss";

const BecomeMember = () => {
  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.lidWorden);
    }
  }, [context]);
  return (
    <main className="become-member">
      {data && (
        <section className="become-member__background">
          <img
            src={data.background.responsiveImage.srcSet}
            alt={data.background.responsiveImage.alt}
          />
        </section>
      )}
      <section className="become-member__title-container">
        <h1 className="become-member__title">Lid Worden</h1>
      </section>
      <section className="become-member__content">
        <Grid>
          <Column col={12}>
            <SubscribeForm />
          </Column>
        </Grid>
      </section>
    </main>
  );
};
export default BecomeMember;
