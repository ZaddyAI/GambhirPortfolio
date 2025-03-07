"use client";
import React, { useState } from "react";
import { experiencesData } from "../constants";

function Experiences() {
    const [activeTabId, setActiveTabId] = useState(0);
    const buttonHeight = 42;
    const buttonHoverHeight = buttonHeight + 8;

    return (
        <section className="sm:ml-40 ml-0 sm:py-20 text-lightest-slate lg:h-[80vh]" id="experiences">
            {/* Section Heading */}
            <div className="flex items-center space-x-4 mb-10">
                <span className="text-green font-sfMono text-lg">02.</span>
                <h2 className="font-calibre font-semibold text-heading text-lightest-slate whitespace-nowrap">
                    Where I’ve Worked
                </h2>
                <div className="w-[350px] h-px bg-lightest-navy"></div>
            </div>

            {/* Tabs and Content */}
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row">
                    {/* Tabs - Horizontal on mobile, vertical on larger screens */}
                    <div className="md:w-1/6 flex md:flex-col overflow-x-auto md:overflow-visible relative">
                        {/* Vertical Line */}
                        <div
                            className={`absolute top-0 left-0 w-0.5 bg-lightest-navy transition-all duration-300`}
                            style={{
                                height: `${experiencesData.length * buttonHoverHeight - 8}px`,
                            }}
                        ></div>

                        {/* Tab Buttons */}
                        <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2 list-none relative">
                            {experiencesData.map((job, index) => (
                                <li key={index} className="flex-shrink-0 text-xs font-sfMono relative">
                                    <button
                                        className={`text-left px-4 py-2 w-full md:w-auto ${activeTabId === index ? "text-green" : "text-slate"
                                            } hover:bg-lightest-navy hover:text-green ${index === experiencesData.length - 1 ? "border-b-0" : ""
                                            }`}
                                        onClick={() => setActiveTabId(index)}
                                        style={{
                                            position: "relative",
                                            top: `${(buttonHeight - 42) / 2}px`,
                                            height: `${buttonHeight}px`,
                                        }}
                                    >
                                        {job.company}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Active Tab Indicator */}
                        <div
                            className={`absolute top-0 left-0 w-0.5 bg-green transition-transform duration-300`}
                            style={{
                                height: `${buttonHeight}px`,
                                transform: `translateY(${activeTabId * buttonHoverHeight}px)`,
                            }}
                        ></div>
                    </div>

                    {/* Content */}
                    <div className="md:w-3/4 mt-6 md:mt-0">
                        {experiencesData.map((job, index) => (
                            <div
                                key={index}
                                className={`transition-opacity duration-300 ${activeTabId === index ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
                                    }`}
                            >
                                <h3 className="text-xxl font-calibre font-semibold">
                                    {job.title} <span className="text-green">@</span>
                                    <a href={job.url} className="link-tab">
                                        {job.company}
                                    </a>
                                </h3>
                                <p className="text-light-slate font-sfMono text-xs mb-4">{job.range}</p>
                                <ul className="font-calibre w-full sm:w-1/2 sm:text-lg text-sm">
                                    {job.description.map((paragraph, i) => (
                                        <li key={i} className="li text-slate" dangerouslySetInnerHTML={{ __html: paragraph }} />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Experiences;
