import React, { useContext, useState, useEffect } from "react";
import { DatoContext } from "../../hooks/datoCMS";

import "./Footer.scss";

const Footer = () => {
  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.footer);
      console.log(data);
    }
  }, [context]);

  return (
    <footer className="footer">
      {data && (
        <section className="footer__row footer__row--red">
          {data.columns.map((item, index) => {
            return (
              <div className="footer__column" key={index}>
                {item.title}
              </div>
            );
          })}
        </section>
      )}
    </footer>
  );
};
export default Footer;
