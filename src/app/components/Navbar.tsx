"use client"
import { useState } from "react"
import CustomIconLogo from "./icons/customlogo.jsx"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between px-3 sm:px-5 lg:px-10 py-6 sm:py-8 w-full text-white relative z-50">
      <div className="flex flex-shrink-0 items-center">
        <a
          href="https://www.gambhirpoudel.com.np/"
          className="w-[40px] sm:w-[50px] text-lightest-slate hover:text-green transition-colors duration-300"
        >
          <CustomIconLogo />
        </a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex gap-4 lg:gap-6 items-center justify-center">
        <a
          href="#about"
          className="relative font-sfMono text-lightest-slate hover:text-green text-xs transition-colors duration-300"
        >
          <span className="text-green">01. </span>About
        </a>
        <a
          href="#experiences"
          className="relative font-sfMono text-lightest-slate hover:text-green text-xs transition-colors duration-300"
        >
          <span className="text-green">02. </span>Experience
        </a>
        <a
          href="#works"
          className="relative font-sfMono text-lightest-slate hover:text-green text-xs transition-colors duration-300"
        >
          <span className="text-green">03. </span>Work
        </a>
        <a
          href="#contacts"
          className="relative font-sfMono text-lightest-slate hover:text-green text-xs transition-colors duration-300"
        >
          <span className="text-green">04. </span>Contacts
        </a>
        <a href="/gambhir.pdf" target="_blank" rel="noopener noreferrer" className="smallButton">
          Resume
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`w-6 h-0.5 bg-lightest-slate transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span className={`w-6 h-0.5 bg-lightest-slate transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
        <span
          className={`w-6 h-0.5 bg-lightest-slate transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 bg-navy bg-opacity-95 backdrop-blur-sm z-40">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <a
              href="#about"
              className="font-sfMono text-lightest-slate hover:text-green text-lg transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-green text-sm">01. </span>About
            </a>
            <a
              href="#experiences"
              className="font-sfMono text-lightest-slate hover:text-green text-lg transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-green text-sm">02. </span>Experience
            </a>
            <a
              href="#works"
              className="font-sfMono text-lightest-slate hover:text-green text-lg transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-green text-sm">03. </span>Work
            </a>
            <a
              href="#contacts"
              className="font-sfMono text-lightest-slate hover:text-green text-lg transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-green text-sm">04. </span>Contacts
            </a>
            <a
              href="/gambhir.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="smallButton mt-4"
              onClick={() => setIsOpen(false)}
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
