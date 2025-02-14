import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useGlobalStore } from "../../hooks/GlobalStore";

import "./PasswordForm.scss";

const PasswordForm = () => {
  const { register, handleSubmit } = useForm();
  const { slug } = useParams();

  const { state, dispatch } = useGlobalStore();
  const [inCorrectPassword, setIncorrectPassword] = useState(false);
  const onSubmit = (data) => {
    fetch(`content/pages/${slug}/verify-password`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "SET_PROPERTY",
          key: "passwordNeeded",
          value: res.passwordNeeded,
        });
        dispatch({
          type: "SET_PROPERTY",
          key: "currentPage",
          value: res.content,
        });
        setIncorrectPassword(!res.correctPassword);
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
          <div className="password-form__field-container">
            <label className="password-form__label">
              Vul het wachtwoord in:
            </label>
            <input
              type="password"
              id="password"
              className="password-form__input"
              {...register("password")}
            />
            {inCorrectPassword && (
              <span className="password-form__error-message">
                Dit wachtwoord is niet goed.
              </span>
            )}
          </div>
          <div className="password-form__button-container">
            <button type="submit" className="btn btn--solid password-form__btn">
              Verstuur
            </button>
            <button className="btn password-form__btn">
              <Link to="/">Naar home</Link>
            </button>
          </div>
        </form>
      </div>
      <div className="password-form__underlay"></div>
    </section>
  );
};

export default PasswordForm;
