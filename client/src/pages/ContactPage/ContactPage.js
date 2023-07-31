import React, { useContext, useState, useEffect } from "react";
import { DatoContext } from "../../hooks/datoCMS";
import { Loader } from "@googlemaps/js-api-loader";

import "./ContactPage.scss";
import Grid from "../../layout/Grid/Grid";
import Column from "../../layout/Column/Column";
import Button from "../../components/Button/Button";
import ContactForm from "../../components/ContactForm/ContactForm";

const ContactPage = () => {
  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.contact);
      console.log(data);
    }
  }, [context]);

  let map;
  const loader = new Loader({
    apiKey: process.env.REACT_APP_MAPS_API,
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
          <section className="contact__background">
            <img
              src={data.background.responsiveImage.srcSet}
              alt={data.background.responsiveImage.alt}
            />
          </section>
          <section className="contact__title-container">
            <h1 className="contact__title">Contact</h1>
          </section>
          <section className="contact__content-container">
            <Grid>
              <Column col={6}>
                {data.handigeLinks && (
                  <div className="contact__links-wrapper">
                    <h2 className="contact__links-title">Handige Links</h2>
                    <div className="contact__links-container">
                      {data.handigeLinks.map((item, index) => {
                        return (
                          <div className="contact__links" key={index}>
                            <Button
                              text={item.linkLabel}
                              href={item.url ? item.url : null}
                              to={item.link ? item.link.slug : null}
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
                      dangerouslySetInnerHTML={address(data.address)}></div>
                  </div>
                )}
              </Column>
              <Column col={6}>
                <ContactForm />
              </Column>
            </Grid>
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
