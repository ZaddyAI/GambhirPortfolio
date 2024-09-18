import React from "react";
import { email, contactDescription, name } from "../constants";

function Contact() {
  return (
    <section className="sm:w-[80%] w-[55%]  text-center" id="contacts">
      <div className="contact">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-green font-sfMono  text-xs">
            0.4 Whats Next ?
          </span>
        </div>
        <h2 className="font-calibre font-semibold  text-heading2 text-lightest-slate whitespace-nowrap">
          Get In Touch
        </h2>
        <div className="sm:w-[50%] w[5%] py-10  text-lg font-calibre text-slate sm:mx-auto mx-5">
          <p>
            {contactDescription}
          </p>
        </div>
        <a href={`mailto:${email}`} className="button w-fit mx-auto">
          Say Hello
        </a>
        <div className="sm:mt-40 mt-20 bottom-0 sm:mb-2 font-sfMono text-xxs hover:text-green text-light-slate">
          <p>Build by {name}</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
