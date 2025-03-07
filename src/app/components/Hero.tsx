import React from "react";
import { name, heroDescription, socialLinks } from "../constants";

const Hero = () => {
    return (
        <section className="ml-2" id="hero">
            <div className="flex flex-wrap">
                <div className="w-full">
                    <div className="items-center lg:items-start">
                        <p className="text-green text-sm sm:text-md font-sfMono">Hi, my name is</p>
                        <h2 className="text-lightest-slate text-4xl sm:text-5xl lg:text-6xl font-calibre font-semibold mt-2">
                            {name}.
                        </h2>
                        <h3 className="text-lightest-slate text-3xl sm:text-4xl lg:text-5xl font-calibre font-medium mt-2">
                            I build things for the web
                        </h3>
                        <p className="text-slate text-sm sm:text-md lg:text-lg mt-4 max-w-[315px] sm:max-w-[540px] mx-auto lg:mx-0 font-calibre">
                            {heroDescription}
                        </p>
                    </div>
                </div>
                <div className="w-full mt-8 flex flex-col sm:flex-row gap-4">
                    <a
                        href="/gambhir.pdf"
                        className="smallButton bg-green text-navy py-2 px-4 rounded text-sm sm:text-md text-center sm:hidden"
                    >
                        Download Resume
                    </a>
                    <a
                        href={socialLinks.github}
                        className="bigButton "
                    >
                        Check out projects
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
