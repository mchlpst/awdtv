import React from "react";
import Hero from "../../components/Hero/Hero";
import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";
import CustomForm from "../../components/CustomForm/CustomForm";

import "./CustomPage.scss";

const CustomPage = () => {
  return (
    <main className="custom-page">
      <Hero title="Inschrijven Schoolkorfbal AW.DTV/IJskoud De Beste" />
      <section className="custom-page__content">
        <Grid>
          <Column col={12}>
            <CustomForm />
          </Column>
        </Grid>
      </section>
    </main>
  );
};
export default CustomPage;
