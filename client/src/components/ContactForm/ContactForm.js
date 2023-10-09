import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./ContactForm.scss";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFeedback("verzenden...");
    fetch("send-contact-form", {
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
  const [feedback, setFeedback] = useState("Verstuur");
  const [emailSend, setEmailSend] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <h2 className="contact-form__title">Contactformulier</h2>
      <p className="contact-form__text">
        Vul het contactformulier in en wij nemen contact met u op.
      </p>
      {!emailSend ? (
        <>
          <div className="contact-form__row">
            <fieldset className="contact-form__fieldset col-6">
              <label className="contact-form__label" htmlFor="firstName">
                Voornaam
              </label>
              <input
                className={`contact-form__input ${
                  errors.firstName ? "contact-form__input--error" : ""
                }`}
                id="firstName"
                placeholder="Robin"
                type="text"
                {...register("firstName", {
                  required: "Je voornaam is verplicht",
                })}
              />
              {errors.firstName && (
                <span className="contact-form__input-error">
                  {errors.firstName.message}
                </span>
              )}
            </fieldset>
            <fieldset className="contact-form__fieldset col-6">
              <label className="contact-form__label" htmlFor="lastName">
                Achternaam
              </label>
              <input
                className={`contact-form__input ${
                  errors.lastName ? "contact-form__input--error" : ""
                }`}
                id="lastName"
                placeholder="van Dongen"
                type="text"
                {...register("lastName", {
                  required: "Je achternaam is verplicht",
                })}
              />
              {errors.lastName && (
                <span className="contact-form__input-error">
                  {errors.lastName.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="contact-form__row">
            <fieldset className="contact-form__fieldset col-6">
              <label className="contact-form__label" htmlFor="email">
                Emailadres
              </label>
              <input
                id="email"
                placeholder="info@awdtv.nl"
                type="email"
                className={`contact-form__input ${
                  errors.email ? "contact-form__input--error" : ""
                }`}
                {...register("email", {
                  required: "Je moet je email invullen",
                })}
              />
              {errors.email && (
                <span className="contact-form__input-error">
                  {errors.email.message}
                </span>
              )}
            </fieldset>
            <fieldset className="contact-form__fieldset col-6">
              <label className="contact-form__label" htmlFor="phone">
                Telefoonnummer
              </label>
              <input
                id="phone"
                placeholder="0633564576"
                type="tel"
                className={`contact-form__input ${
                  errors.phone ? "contact-form__input--error" : ""
                }`}
                {...register("phone", {
                  required: "Je moet je telefoonnummer invullen",
                })}
              />
              {errors.phone && (
                <span className="contact-form__input-error">
                  {errors.phone.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="contact-form__row">
            <fieldset className="contact-form__fieldset col-12">
              <label className="contact-form__label" htmlFor="message">
                Bericht
              </label>
              <textarea
                className={`contact-form__textarea ${
                  errors.message ? "contact-form__textarea--error" : ""
                }`}
                id="message"
                placeholder="bericht"
                cols="100"
                rows={8}
                {...register("message", {
                  required: "Je bericht is verplicht",
                })}
              />
              {errors.message && (
                <span className="contact-form__textarea-error">
                  {errors.message.message}
                </span>
              )}
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
        <div className="contact-form__success-container">
          <h4 className="contact-form__success-title">Gelukt!</h4>
          <p className="contact-form__success-container">
            Je bericht is succesvol verzonden. We nemen zo snel mogelijk contact
            met je op.
          </p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
