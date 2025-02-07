import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import "./PasswordForm.scss";

const PasswordForm = () => {
  const { register, handleSubmit } = useForm();
  const { slug } = useParams();

  const onSubmit = (data) => {
    fetch(`content/pages/${slug}/verify-password`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <section className="password-form">
      <h1 className="password-form__title">Deze pagina is beveiligd</h1>
      <div className="password-form__container">
        <form className="password-form__form" onSubmit={handleSubmit(onSubmit)}>
          <label className="password-form__label">Vul het wachtwoord in:</label>
          <input
            type="password"
            id="password"
            className="password-form__input"
            {...register("password")}
          />
          <button type="submit" className="btn btn--solid password-form__btn">
            Verstuur
          </button>
        </form>
      </div>
      <div className="password-form__underlay"></div>
    </section>
  );
};

export default PasswordForm;
