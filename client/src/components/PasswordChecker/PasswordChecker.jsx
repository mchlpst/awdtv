import React from "react";
import { createPortal } from "react-dom";

import Hero from "../Hero/Hero";
import PasswordForm from "../PasswordForm/PasswordForm";

const PasswordChecker = () => {
  return (
    <section>
      <Hero imageSrc={null} imageAlt={null} page />
      {createPortal(<PasswordForm />, document.body)}
    </section>
  );
};
export default PasswordChecker;
