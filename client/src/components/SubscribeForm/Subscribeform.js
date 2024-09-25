import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";

import "./Subscribeform.scss";

const SubscribeForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [ot18, setOt18] = useState(true);
  const [feedback, setFeedback] = useState("Verstuur");
  const [emailSend, setEmailSend] = useState(false);

  const onSubmit = (data) => {
    setFeedback("verzenden...");

    fetch("/api/new-member", {
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
  const custody = watch("custody");
  const date = watch("birthdate");

  useEffect(() => {
    if (date !== undefined) {
      const checkDate = new Date(date).getTime();
      const benchDate = new Date().setFullYear(new Date().getFullYear() - 18);
      setOt18(checkDate < benchDate);
    }
  }, [date]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="subscribe-form">
      {!emailSend ? (
        <>
          <div className="subscribe-form__row">
            <fieldset className="subscribe-form__fieldset col-2">
              <label htmlFor="gender" className="subscribe-form__label">
                Geslacht
              </label>
              <div
                className={`select subscribe-form__select ${
                  errors.gender ? "subscribe-form__select--error" : ""
                }`}>
                <select
                  className={`subscribe-form__select ${
                    errors.gender ? "subscribe-form__select--error" : ""
                  }`}
                  {...register("gender", {
                    required: "Dit veld is verplicht",
                  })}>
                  <option value="">Kies...</option>
                  <option value="M">Man</option>
                  <option value="V">Vrouw</option>
                </select>
              </div>
              {errors.gender && (
                <span className="subscribe-form__input-error">
                  {errors.gender.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="subscribe-form__row">
            <fieldset className="subscribe-form__fieldset col-6">
              <label className="subscribe-form__label" htmlFor="firstName">
                Voornaam
              </label>
              <input
                className={`subscribe-form__input ${
                  errors.firstName ? "subscribe-form__input--error" : ""
                }`}
                id="firstName"
                placeholder="Robin"
                type="text"
                {...register("firstName", {
                  required: "Je voornaam is verplicht",
                })}
              />
              {errors.firstName && (
                <span className="subscribe-form__input-error">
                  {errors.firstName.message}
                </span>
              )}
            </fieldset>
            <fieldset className="subscribe-form__fieldset col-6">
              <label className="subscribe-form__label" htmlFor="lastName">
                Achternaam
              </label>
              <input
                className={`subscribe-form__input ${
                  errors.lastName ? "subscribe-form__input--error" : ""
                }`}
                id="lastName"
                placeholder="van Dongen"
                type="text"
                {...register("lastName", {
                  required: "Je achternaam is verplicht",
                })}
              />
              {errors.lastName && (
                <span className="subscribe-form__input-error">
                  {errors.lastName.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="subscribe-form__row">
            <fieldset className="subscribe-form__fieldset col-12">
              <label className="subscribe-form__label" htmlFor="address">
                Adres
              </label>
              <input
                id="address"
                placeholder="Foekje Dillemastraat 118"
                type="text"
                className={`subscribe-form__input ${
                  errors.address ? "subscribe-form__input--error" : ""
                }`}
                {...register("address", { required: "Je adres is verplicht" })}
              />
              {errors.address && (
                <span className="subscribe-form__input-error">
                  {errors.address.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="subscribe-form__row">
            <fieldset className="subscribe-form__fieldset col-4">
              <label className="subscribe-form__label" htmlFor="postalCode">
                Postcode
              </label>
              <input
                id="postalCode"
                placeholder="1095 MK"
                type="text"
                className={`subscribe-form__input ${
                  errors.postalCode ? "subscribe-form__input--error" : ""
                }`}
                {...register("postalCode", {
                  pattern: {
                    value: /^\d{4}\s?[A-Za-z]{2}$/,
                    message: "Je postcode is niet goed geschreven",
                  },
                  required: "Je postcode is niet ingevuld",
                })}
              />
              {errors.postalCode && (
                <span className="subscribe-form__input-error">
                  {errors.postalCode.message}
                </span>
              )}
            </fieldset>
            <fieldset className="subscribe-form__fieldset col-8">
              <label className="subscribe-form__label" htmlFor="city">
                Plaats
              </label>
              <input
                id="city"
                placeholder="Amsterdam"
                type="text"
                className={`subscribe-form__input ${
                  errors.city ? "subscribe-form__input--error" : ""
                }`}
                {...register("city", {
                  required: "Je moet je plaats invullen",
                })}
              />
              {errors.city && (
                <span className="subscribe-form__input-error">
                  {errors.city.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="subscribe-form__row">
            <fieldset className="subscribe-form__fieldset col-6">
              <label className="subscribe-form__label" htmlFor="birthdate">
                Geboorte datum
              </label>
              <input
                id="birthdate"
                className={`subscribe-form__input ${
                  errors.birthdate ? "subscribe-form__input--error" : ""
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
              <span className="subscribe-form__helper-text">
                Vul hier de geboortedatum in van het aankomende lid.
              </span>
              {errors.birthdate && (
                <span className="subscribe-form__input-error">
                  {errors.birthdate.message}
                </span>
              )}
            </fieldset>
            <fieldset className="subscribe-form__fieldset subscribe-form__fieldset--checkbox col-6">
              <div className="subscribe-form__checkbox-container">
                <label className="subscribe-form__label" htmlFor="custody">
                  Ik ben de ouder/voogd
                </label>
                <input
                  id="custody"
                  type="checkbox"
                  {...register("custody", {
                    required: ot18
                      ? false
                      : "Het lijkt erop dat het lid dat je inschrijft niet ouder is dan 18. Vink dit aan om verder te gaan.",
                  })}
                />
              </div>
              {errors.custody && (
                <span className="subscribe-form__input-error">
                  {errors.custody.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="subscribe-form__row">
            <fieldset className="subscribe-form__fieldset col-6">
              <label className="subscribe-form__label" htmlFor="memberPhone">
                Telefoonnummer Lid
              </label>
              <input
                id="memberPhone"
                placeholder="0633564576"
                type="tel"
                className={`subscribe-form__input ${
                  errors.memberPhone ? "subscribe-form__input--error" : ""
                }`}
                {...register("memberPhone", {
                  required: custody
                    ? false
                    : "Je moet je telefoonnummer invullen",
                })}
              />
              {errors.memberPhone && (
                <span className="subscribe-form__input-error">
                  {errors.memberPhone.message}
                </span>
              )}
            </fieldset>
            {custody && (
              <fieldset className="subscribe-form__fieldset col-6">
                <label className="subscribe-form__label" htmlFor="custodyPhone">
                  Telefoonnummer ouder/voogd
                </label>
                <input
                  id="custodyPhone"
                  placeholder="0633564576"
                  type="tel"
                  className={`subscribe-form__input ${
                    errors.custodyPhone ? "subscribe-form__input--error" : ""
                  }`}
                  {...register("custodyPhone", {
                    required: custody
                      ? "Je moet als ouder/voogd je telefoonnummer invullen"
                      : false,
                  })}
                />
                {errors.custodyPhone && (
                  <span className="subscribe-form__input-error">
                    {errors.custodyPhone.message}
                  </span>
                )}
              </fieldset>
            )}
          </div>
          <div className="subscribe-form__row">
            <fieldset className="subscribe-form__fieldset col-6">
              <label className="subscribe-form__label" htmlFor="memberEmail">
                Emailadres Lid
              </label>
              <input
                id="memberEmail"
                placeholder="info@awdtv.nl"
                type="email"
                className={`subscribe-form__input ${
                  errors.memberEmail ? "subscribe-form__input--error" : ""
                }`}
                {...register("memberEmail", {
                  required: custody ? false : "Je moet je email invullen",
                })}
              />
              {errors.memberEmail && (
                <span className="subscribe-form__input-error">
                  {errors.memberEmail.message}
                </span>
              )}
            </fieldset>
            {custody && (
              <fieldset className="subscribe-form__fieldset col-6">
                <label className="subscribe-form__label" htmlFor="custodyEmail">
                  Emailadres ouder/voogd
                </label>
                <input
                  id="custodyEmail"
                  placeholder="info@awdtv.nl"
                  type="email"
                  className={`subscribe-form__input ${
                    errors.custodyEmail ? "subscribe-form__input--error" : ""
                  }`}
                  {...register("custodyEmail", {
                    required: custody
                      ? "je moet als ouder/voogd je email invullen"
                      : false,
                  })}
                />
                {errors.custodyEmail && (
                  <span className="subscribe-form__input-error">
                    {errors.custodyEmail.message}
                  </span>
                )}
              </fieldset>
            )}
          </div>
          <div className="subscribe-form__row">
            <fieldset className="subscribe-form__fieldset col-12">
              <legend>Wat voor lid ga je worden?</legend>
              <div className="subscribe-form__radio-container">
                <input
                  type="radio"
                  id="welpen"
                  value="welpen"
                  {...register("class")}
                />
                <label className="subscribe-form__label" htmlFor="welpen">
                  Welpen
                </label>
              </div>
              <div className="subscribe-form__radio-container">
                <input
                  type="radio"
                  id="pupillen"
                  value="pupillen"
                  {...register("class")}
                />
                <label className="subscribe-form__label" htmlFor="pupillen">
                  Pupillen
                </label>
              </div>
              <div className="subscribe-form__radio-container">
                <input
                  type="radio"
                  id="aspiranten"
                  value="aspiranten"
                  {...register("class")}
                />
                <label className="subscribe-form__label" htmlFor="aspiranten">
                  Aspiranten
                </label>
              </div>
              <div className="subscribe-form__radio-container">
                <input
                  type="radio"
                  id="junioren"
                  value="junioren"
                  {...register("class")}
                />
                <label className="subscribe-form__label" htmlFor="junioren">
                  Junioren
                </label>
              </div>
              <div className="subscribe-form__radio-container">
                <input
                  type="radio"
                  id="senioren"
                  value="senioren"
                  {...register("class")}
                />
                <label className="subscribe-form__label" htmlFor="senioren">
                  Senioren
                </label>
              </div>
              <div className="subscribe-form__radio-container">
                <input
                  type="radio"
                  id="niet-spelend-lid"
                  value="niet-spelend-lid"
                  {...register("class")}
                />
                <label
                  className="subscribe-form__label"
                  htmlFor="niet-spelend-lid">
                  Niet spelend lid
                </label>
              </div>
              <div className="subscribe-form__radio-container">
                <input
                  type="radio"
                  id="donateur-korfbalfit"
                  value="donateur-korfbalfit"
                  {...register("class")}
                />
                <label
                  className="subscribe-form__label"
                  htmlFor="donateur-korfbalfit">
                  Donateur/Korfbalfit
                </label>
              </div>
              <span className="subscribe-form__helper-text">
                Als je niet weet wat je bent dan kan je dit veld ook leeg laten.
              </span>
            </fieldset>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn--solid subscribe-form__btn">
              {feedback}
            </button>
          </div>
        </>
      ) : (
        <div className="subscribe-form__finished-container">
          <h2 className="subscribe-form__finished-title">Verzonden!</h2>
          <p className="subscribe-form__finished-text">
            Je aanmelding is succesvol verzonden. Binnenkort wordt er contact
            met je opgenomen om het formulier te ondertekenen en je persoonlijk
            welkom te heten bij AW.DTV
          </p>
          <p className="subscribe-form__finished-text">
            Met vriendelijke groet, <br /> Het secretariaat van AW.DTV
          </p>
          <Button
            extraClass="subscribe-form__btn"
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
export default SubscribeForm;
