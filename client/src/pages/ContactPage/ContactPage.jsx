import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import "./ContactPage.scss";
import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";
import Button from "../../components/Button/Button";
import ContactForm from "../../components/ContactForm/ContactForm";

const ContactPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(
      `https://awdtv-cms-prod-9a1b80aeab80.herokuapp.com/api/contact?populate[0]=HandigeLinks&populate[1]=Background&populate[2]=HandigeLinks.page&populate[3]=HandigeLinks.article`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.data.attributes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   if (context) {
  //     setData(context.contact);
  //   }
  // }, [context]);

  let map;
  const loader = new Loader({
    apiKey: import.meta.env.VITE_MAPS_API,
    version: "weekly",
  });
  const position = { lat: 52.37250267528257, lng: 4.968654268456325 };

  loader.load().then(async () => {
    const { Map } = await window.google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary(
      "marker"
    );

    map = new Map(document.getElementById("map"), {
      center: position,
      zoom: 17,
      mapId: "3081575038ac65c9",
      fullscreenControl: false,
      mapTypeControl: false,
    });
    // eslint-disable-next-line
    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: "AW.DTV",
    });
  });

  const address = (val) => {
    return { __html: val };
  };
  return (
    <main className="contact">
      {data && (
        <>
          <section className="contact__wrapper">
            <section className="contact__background">
              {data.Background.data && (
                <img
                  src={data.Background.data.attributes.url}
                  alt={data.Background.data.attributes.alternativeText}
                />
              )}
            </section>
            <section className="contact__title-container">
              <h1 className="contact__title">
                {data.Title ? data.Title : "Contact"}
              </h1>
            </section>
            <section className="contact__content-container">
              <Grid>
                <Column col={6}>
                  {data.HandigeLinks.length > 0 && (
                    <div className="contact__links-wrapper">
                      <h2 className="contact__links-title">Handige Links</h2>
                      <div className="contact__links-container">
                        {data.HandigeLinks.map((item, index) => {
                          return (
                            <div className="contact__links" key={index}>
                              <Button
                                text={item.LinkLabel}
                                href={item.Url ? item.Url : null}
                                to={
                                  item.article.data
                                    ? item.article.data.Slug
                                    : item.page.data
                                    ? item.pate.data.Slug
                                    : null
                                }
                                target="_blank"
                                type="solid"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {data.address && (
                    <div className="contact__address-wrapper">
                      <h2 className="contact__address-title">
                        Adres zaal & veld
                      </h2>
                      <div
                        className="contact__address"
                        dangerouslySetInnerHTML={address(data.Address)}></div>
                    </div>
                  )}
                </Column>
                <Column col={6}>
                  <ContactForm />
                </Column>
              </Grid>
            </section>
          </section>
          <section className="contact__map-container">
            <div className="contact__map" id="map"></div>
          </section>
        </>
      )}
    </main>
  );
};
export default ContactPage;
