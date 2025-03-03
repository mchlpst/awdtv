import { useState } from 'react';
import { useForm } from "react-hook-form";
import Hero from "../../components/Hero/Hero";
import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";
import Button from '../../components/Button/Button';

import './RegisterKamp.scss';

const RegisterKamp = () => {
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
        fetch("/api/send-register-kamp", {
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

  return(
    <main className="register-kamp">
      <Hero title="Aanmelden Kamp" />
      <section className="register-kamp__content">
        <Grid>
          <Column col={12}>
          <form onSubmit={handleSubmit(onSubmit)} className="register-kamp__form">
      {!emailSend ? (
        <>
          <p className="register-kamp__paragraph">Ook dit jaar willen wij op kamp. Daarvoor hebben we genoeg aanmeldingen nodig. Maak je team enthausiast en ga met ons mee.</p>
          <p className="register-kamp__paragraph">Aanmelden kan tot <strong>zaterdag 8 maart</strong>. Op zondag 9 maart zullen wij een besluit nemen of het kamp door zal gaan.</p>
            <ul className="register-kamp__paragraph">
              <li>Wanneer: maandag 14 juli t/m vrijdag 18 juli</li>
              <li>De locatie zal wederom de Zandkamp zijn in Ermelo, net zoals vorig jaar.</li>
              <li>De kosten voor het kamp zullen &euro;&nbsp;135,- bedragen.</li>
            </ul>
          <div className="register-kamp__row">
            <fieldset className="register-kamp__fieldset col-6">
              <label className="register-kamp__label" htmlFor="firstName">
                Voornaam
              </label>
              <input
                className={`register-kamp__input ${
                  errors.firstName ? "register-kamp__input--error" : ""
                }`}
                id="firstName"
                placeholder="Robin"
                type="text"
                {...register("firstName", {
                  required: "Je voornaam is verplicht",
                })}
              />
              {errors.firstName && (
                <span className="register-kamp__input-error">
                  {errors.firstName.message}
                </span>
              )}
            </fieldset>
            <fieldset className="register-kamp__fieldset col-6">
              <label className="register-kamp__label" htmlFor="lastName">
                Achternaam
              </label>
              <input
                className={`register-kamp__input ${
                  errors.lastName ? "register-kamp__input--error" : ""
                }`}
                id="lastName"
                placeholder="van Dongen"
                type="text"
                {...register("lastName", {
                  required: "Je achternaam is verplicht",
                })}
              />
              {errors.lastName && (
                <span className="register-kamp__input-error">
                  {errors.lastName.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="register-kamp__row">
            <fieldset className="register-kamp__fieldset col-3">
              <label className="register-kamp__label" htmlFor="birthdate">
                Leeftijd
              </label>
              <input
                id="age"
                className={`register-kamp__input ${
                  errors.age ? "register-kamp__input--error" : ""
                }`}
                placeholder='12'
                type="text"
                {...register("age", {
                  required: "Je moet je leeftijd invullen",
                })}
              />
              {errors.age && (
                <span className="register-kamp__input-error">
                  {errors.age.message}
                </span>
              )}
            </fieldset>
            <fieldset className="register-kamp__fieldset col-2">
              <label htmlFor="team" className="register-kamp__label">
                Team
              </label>
              <div
                className={`select register-kamp__select ${
                  errors.team ? "register-kamp__select--error" : ""
                }`}>
                <select
                  className={`register-kamp__select ${
                    errors.team ? "register-kamp__select--error" : ""
                  }`}
                  {...register("team", {
                    required: "Dit veld is verplicht",
                  })}>
                  <option value="">Kies...</option>
                  <option value="A1">A1</option>
                  <option value="D1">D1</option>
                  <option value="E1">E1</option>
                  <option value="E2">E2</option>
                  <option value="E3">E3</option>
                  <option value="F1">F1</option>
                </select>
              </div>
              {errors.team && (
                <span className="register-kamp__input-error">
                  {errors.team.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="register-kamp__row">
            <fieldset className="register-kamp__fieldset col-6">
              <label className="register-kamp__label" htmlFor="phone">
                Telefoonnummer (van ouder/verzorger)
              </label>
              <input
                id="phone"
                placeholder="0633564576"
                type="tel"
                className={`register-kamp__input ${
                  errors.phone ? "register-kamp__input--error" : ""
                }`}
                {...register("phone", {
                  required: "Je moet je telefoonnummer invullen",
                })}
              />
              {errors.phone && (
                <span className="register-kamp__input-error">
                  {errors.phone.message}
                </span>
              )}
            </fieldset>
          </div>
          <div>
            <button type="submit" className="btn btn--solid register-kamp__btn">
              {feedback}
            </button>
          </div>
        </>
      ) : (
        <div className="register-kamp__finished-container">
          <h2 className="register-kamp__finished-title">Verzonden!</h2>
          <p className="register-kamp__finished-text">
            Je aanmelding is succesvol verzonden.
          </p>
          <p className="register-kamp__finished-text">
            Met vriendelijke groet, <br /> De kamp commissie
          </p>
          <Button
            extraClass="register-kamp__btn"
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
          </Column>
        </Grid>
      </section>
    </main>
  )
}
export default RegisterKamp