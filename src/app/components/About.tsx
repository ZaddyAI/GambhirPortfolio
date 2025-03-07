import React from "react";
import aboutImage from "@/app/assets/about.webp";
import Image from "next/image";
import {
    aboutParagraph1,
    aboutParagraph2,
    aboutParagraph3,
    aboutParagraph4,
    skills,
} from "../constants";

function About() {
    return (
        <section className="py-20 text-lightest-slate" id="about">
            <div className="lg:ml-20 sm:ml-0">
                <div className="flex items-center space-x-4 mb-10">
                    <span className="text-green font-sfMono sm:text-lg text-xs">01.</span>
                    <h2 className="font-calibre font-semibold text-heading text-lightest-slate whitespace-nowrap">
                        About Me
                    </h2>
                    <div className="w-[350px] h-px bg-lightest-navy"></div>
                </div>
                <div className="flex sm:flex-row flex-col sm:gap-10 gap-5">
                    <div className="text sm:w-2/5 w-full line-height-2 text-slate sm:text-lg text-sm">
                        <div>
                            <p className="sm:mb-4 mb-2">{aboutParagraph1}</p>
                            <p className="sm:mb-4 mb-2">{aboutParagraph2}</p>
                            <p className="sm:mb-4 mb-2">{aboutParagraph3}</p>
                            <p className="mb-4" dangerouslySetInnerHTML={{ __html: aboutParagraph4 }} />
                            <p>Here are a few technologies I’ve been working with recently:</p>
                        </div>
                        <ul className="skills-list">
                            {skills.map((skill, i) => (
                                <li key={i}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex sm:justify-center justify-start items-start mt-[0.5rem]">
                        <div className="sm:w-80 sm:h-80 w-[300px] h-[300px] imgg">
                            <Image
                                src={aboutImage.src}
                                alt="About me"
                                layout="responsive"
                                width={700}
                                height={700}
                                className="img object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
