"use client";
import React from "react";
import { socialLinks } from "../constants/";
import IconGitHub from "./icons/github.jsx";
import IconInstagram from "./icons/instagram.jsx";
import IconLinkedin from "./icons/linkedin.jsx";
import IconTwitter from "./icons/twitter.jsx";

const Sidebar = () => {
    return (
        <div className="hidden fixed bottom-0 left-8 ml-5 justify-center sm:flex flex-col items-center space-y-6">
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="h-5 w-5 hover:text-green transition-all duration-300 transform hover:-translate-y-1">
                <IconInstagram />
            </a>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="h-5 w-5 hover:text-green transition-all duration-300 transform hover:-translate-y-1">
                <IconGitHub />
            </a>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="h-5 w-5 hover:text-green transition-all duration-300 transform hover:-translate-y-1">
                <IconTwitter />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="h-5 w-5 hover:text-green transition-all duration-300 transform hover:-translate-y-1">
                <IconLinkedin />
            </a>
            <div className="w-0.5 h-20 bg-slate"></div>
        </div>
    );
};

export default Sidebar;
