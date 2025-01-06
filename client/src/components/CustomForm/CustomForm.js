import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";

import "./CustomForm.scss";

const CustomForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [feedback, setFeedback] = useState("Verstuur");
  const [emailSend, setEmailSend] = useState(false);

  const onSubmit = (data) => {
    setFeedback("verzenden...");
    fetch("/api/custom-form", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(`error with status ${res.status}`);
        }
      })
      .then((res) => {
        setEmailSend(res.emailSend);
        setFeedback("Verzonden!");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
      {!emailSend ? (
        <>
          <div className="custom-form__row">
            <fieldset className="custom-form__fieldset col-2">
              <label htmlFor="gender" className="custom-form__label">
                Geslacht
              </label>
              <div
                className={`select custom-form__select ${
                  errors.gender ? "custom-form__select--error" : ""
                }`}>
                <select
                  className={`custom-form__select ${
                    errors.gender ? "custom-form__select--error" : ""
                  }`}
                  {...register("gender", {
                    required: "Dit veld is verplicht",
                  })}>
                  <option value="">Kies...</option>
                  <option value="Jongen">Jongen</option>
                  <option value="Meisje">Meisje</option>
                </select>
              </div>
              {errors.gender && (
                <span className="custom-form__input-error">
                  {errors.gender.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="custom-form__row">
            <fieldset className="custom-form__fieldset col-6">
              <label className="custom-form__label" htmlFor="firstName">
                Voornaam
              </label>
              <input
                className={`custom-form__input ${
                  errors.firstName ? "custom-form__input--error" : ""
                }`}
                id="firstName"
                placeholder="Robin"
                type="text"
                {...register("firstName", {
                  required: "Je voornaam is verplicht",
                })}
              />
              {errors.firstName && (
                <span className="custom-form__input-error">
                  {errors.firstName.message}
                </span>
              )}
            </fieldset>
            <fieldset className="custom-form__fieldset col-6">
              <label className="custom-form__label" htmlFor="lastName">
                Achternaam
              </label>
              <input
                className={`custom-form__input ${
                  errors.lastName ? "custom-form__input--error" : ""
                }`}
                id="lastName"
                placeholder="van Dongen"
                type="text"
                {...register("lastName", {
                  required: "Je achternaam is verplicht",
                })}
              />
              {errors.lastName && (
                <span className="custom-form__input-error">
                  {errors.lastName.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="custom-form__row">
            <fieldset className="custom-form__fieldset col-6">
              <label className="custom-form__label" htmlFor="birthdate">
                Geboorte datum
              </label>
              <input
                id="birthdate"
                className={`custom-form__input ${
                  errors.birthdate ? "custom-form__input--error" : ""
                }`}
                type="date"
                {...register("birthdate", {
                  required: "Je moet je geboorte datum invullen",
                  pattern: {
                    value: /\d{4}-\d{2}-\d{2}/,
                    message: "Je geboorte datum moet zijn yyy-mm-dd",
                  },
                })}
              />
              {errors.birthdate && (
                <span className="custom-form__input-error">
                  {errors.birthdate.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="custom-form__row">
            <fieldset className="custom-form__fieldset col-6">
              <label className="custom-form__label" htmlFor="phone">
                Telefoonnummer
              </label>
              <input
                id="phone"
                placeholder="0633564576"
                type="tel"
                className={`custom-form__input ${
                  errors.phone ? "custom-form__input--error" : ""
                }`}
                {...register("phone", {
                  required: "Je moet je telefoonnummer invullen",
                })}
              />
              {errors.phone && (
                <span className="custom-form__input-error">
                  {errors.phone.message}
                </span>
              )}
            </fieldset>
            <fieldset className="custom-form__fieldset col-6">
              <label className="custom-form__label" htmlFor="email">
                Emailadres
              </label>
              <input
                id="email"
                placeholder="info@awdtv.nl"
                type="email"
                className={`custom-form__input ${
                  errors.email ? "custom-form__input--error" : ""
                }`}
                {...register("email", {
                  required: "Je moet je email invullen",
                })}
              />
              {errors.email && (
                <span className="custom-form__input-error">
                  {errors.email.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="custom-form__row">
            <fieldset className="custom-form__fieldset col-6">
              <label className="custom-form__label" htmlFor="school">
                School
              </label>
              <input
                id="school"
                placeholder="Basisschool de school"
                type="text"
                className={`custom-form__input ${
                  errors.school ? "custom-form__input--error" : ""
                }`}
                {...register("school", {
                  required: "Je moet je school invullen",
                })}
              />
              {errors.school && (
                <span className="custom-form__input-error">
                  {errors.school.message}
                </span>
              )}
            </fieldset>
            <fieldset className="custom-form__fieldset col-2">
              <label htmlFor="group" className="custom-form__label">
                Groep
              </label>
              <div
                className={`select custom-form__select ${
                  errors.group ? "custom-form__select--error" : ""
                }`}>
                <select
                  className={`custom-form__select ${
                    errors.group ? "custom-form__select--error" : ""
                  }`}
                  {...register("group", {
                    required: "Dit veld is verplicht",
                  })}>
                  <option value="">Kies...</option>
                  <option value="groep-3">Groep 3</option>
                  <option value="groep-4">Groep 4</option>
                  <option value="groep-5">Groep 5</option>
                  <option value="groep-6">Groep 6</option>
                  <option value="groep-7">Groep 7</option>
                  <option value="groep-8">Groep 8</option>
                </select>
              </div>
              {errors.group && (
                <span className="custom-form__input-error">
                  {errors.group.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="custom-form__row">
            <fieldset className="custom-form__fieldset col-6">
              <label className="custom-form__label" htmlFor="parent">
                Naam ouder voor teamcoaching
              </label>
              <input
                id="parent"
                placeholder="Naam ouder"
                type="text"
                className={`custom-form__input ${
                  errors.parent ? "custom-form__input--error" : ""
                }`}
                {...register("parent")}
              />
              {errors.parent && (
                <span className="custom-form__input-error">
                  {errors.parent.message}
                </span>
              )}
              <span className="custom-form__helper-text">
                Wil je ouder je team coachen? Vul dan de naam van ouder je ouder
                hier in.
              </span>
            </fieldset>
          </div>
          <div>
            <button type="submit" className="btn btn--solid custom-form__btn">
              {feedback}
            </button>
          </div>
        </>
      ) : (
        <div className="custom-form__finished-container">
          <h2 className="custom-form__finished-title">Verzonden!</h2>
          <p className="custom-form__finished-text">
            Je aanmelding is succesvol verzonden.
          </p>
          <p className="custom-form__finished-text">
            Met vriendelijke groet, <br /> AW.DTV
          </p>
          <Button
            extraClass="custom-form__btn"
            type="solid"
            text="Nog een aanmelding"
            clickAction={() => {
              setFeedback("Verstuur");
              setEmailSend(false);
              reset();
            }}
          />
        </div>
      )}
    </form>
  );
};
export default CustomForm;
