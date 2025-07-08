"use client"
import { useState, useEffect } from "react"
import { experiencesData } from "../constants"

function Experiences() {
  const [activeTabId, setActiveTabId] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const buttonHeight = 42
  const buttonHoverHeight = buttonHeight + 8

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section
      className="ml-0 sm:ml-20 lg:ml-40 py-12 sm:py-16 lg:py-20 text-lightest-slate px-2 sm:px-0"
      id="experiences"
    >
      {/* Section Heading */}
      <div className="flex items-center space-x-2 sm:space-x-4 mb-8 sm:mb-10">
        <span className="text-green font-sfMono text-sm sm:text-lg">02.</span>
        <h2 className="font-calibre font-semibold text-xl sm:text-heading text-lightest-slate whitespace-nowrap">
          Where I've Worked
        </h2>
        <div className="w-[150px] sm:w-[200px] lg:w-[350px] h-px bg-lightest-navy"></div>
      </div>

      {/* Tabs and Content */}
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Tabs - Horizontal on mobile, vertical on larger screens */}
          <div className="md:w-1/6 flex md:flex-col overflow-x-auto md:overflow-visible relative mb-6 md:mb-0">
            {/* Vertical Line for desktop */}
            <div
              className={`absolute top-0 left-0 w-0.5 bg-lightest-navy transition-all duration-300 hidden md:block`}
              style={{
                height: `${experiencesData.length * buttonHoverHeight - 8}px`,
              }}
            ></div>

            {/* Horizontal Line for mobile */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-lightest-navy w-full md:hidden"></div>

            {/* Tab Buttons */}
            <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2 list-none relative">
              {experiencesData.map((job, index) => (
                <li key={index} className="flex-shrink-0 text-xs font-sfMono relative">
                  <button
                    className={`text-left px-3 sm:px-4 py-2 w-full md:w-auto whitespace-nowrap transition-colors duration-300 ${
                      activeTabId === index ? "text-green" : "text-slate"
                    } hover:bg-lightest-navy hover:text-green ${
                      index === experiencesData.length - 1 ? "border-b-0" : ""
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
              className={`absolute bg-green transition-transform duration-300 ${
                isMobile ? "bottom-0 h-0.5" : "top-0 left-0 w-0.5"
              }`}
              style={{
                height: isMobile ? "2px" : `${buttonHeight}px`,
                width: isMobile ? `${100 / experiencesData.length}%` : "2px",
                transform: isMobile
                  ? `translateX(${activeTabId * 100}%)`
                  : `translateY(${activeTabId * buttonHoverHeight}px)`,
              }}
            ></div>
          </div>

          {/* Content */}
          <div className="md:w-3/4 mt-4 md:mt-0">
            {experiencesData.map((job, index) => (
              <div
                key={index}
                className={`transition-opacity duration-300 ${
                  activeTabId === index ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
                }`}
              >
                <h3 className="text-lg sm:text-xxl font-calibre font-semibold line-height-1">
                  {job.title} <span className="text-green">@</span>
                  <a href={job.url} className="link-tab">
                    {job.company}
                  </a>
                </h3>
                <p className="text-light-slate font-sfMono text-xs mb-4 mt-2">{job.range}</p>
                <ul className="font-calibre w-full sm:w-3/4 lg:w-2/3 text-sm sm:text-lg space-y-2">
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
  )
}

export default Experiences
