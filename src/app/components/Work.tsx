import React from "react";
import IconExternal from "./icons/external.jsx";
import IconFolder from "./icons/folder.jsx";
import IconGitHub from "./icons/github.jsx";
import { projects } from "../constants";

function Work() {
    const visibleProjects = projects.slice(0, 6); // Show only the first 6 projects
    const hasMoreProjects = projects.length > 6; // Check if there are more than 6 projects

    return (
        <section className="w-full sm:w-[80%] lg:w-[80%] sm:ml-10 lg:ml-20 py-10 pr-10 pl-2 sm:pl-0 sm:pr-0 sm:py-20" id="works">
            {/* Section Heading */}
            <div className="flex items-center space-x-4 mb-10">
                <span className="text-green font-sfMono sm:text-lg text-xs">03.</span>
                <h2 className="font-calibre font-semibold sm:text-heading text-xxl text-lightest-slate whitespace-nowrap">
                    Some Things I’ve Built
                </h2>
                <div className="w-[350px] h-px bg-lightest-navy"></div>
            </div>

            {/* Projects Grid */}
            <div className="flex flex-wrap justify-center sm:justify-start">
                {visibleProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>

            {/* View All Projects Button */}
            {hasMoreProjects && (
                <div className="flex justify-start mt-8"> {/* Align button to the start (left) */}
                    <a
                        href="/project-archive" // Replace with the actual link to the project archive page
                        className="text-white font-bold hover:text-green transition-all duration-300 flex items-center gap-2 group"
                    >
                        View Full Project Archive
                        <span className="inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
                    </a>
                </div>
            )}
        </section>
    );
}

// ProjectCard Component
interface Project {
    title: string;
    description: string;
    tools: string[];
    githubLink?: string;
    externalLink?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="w-full sm:w-[45%] lg:w-[30%] project-inner overflow-hidden shadow-lg mb-8 sm:mr-4 lg:mr-8 hover:-translate-y-2 transition-transform duration-300">
            <div className="flex flex-col justify-between h-full p-3"> {/* Reduced padding here */}
                {/* Project Header */}
                <div className="flex justify-between items-start">
                    <div className="sm:w-[50px] w-[40px] text-green">
                        <IconFolder />
                    </div>
                    <div className="flex items-center space-x-2">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-green w-5"
                            >
                                <IconGitHub />
                            </a>
                        )}
                        {project.externalLink && (
                            <a
                                href={project.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-green w-5"
                            >
                                <IconExternal />
                            </a>
                        )}
                    </div>
                </div>

                {/* Project Title */}
                <div className="pt-3 font-calibre text-xxl text-lightest-slate mt-2"> {/* Adjusted padding here */}
                    <p className="font-bold project-title hover:text-green">{project.title}</p>
                </div>

                {/* Project Description */}
                <div className="text-slate text-[17px] font-calibre overflow-hidden" style={{ maxHeight: "6em", lineHeight: "1.3em" }}>
                    <p
                        className="overflow-hidden overflow-ellipsis"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {project.description}
                    </p>
                </div>

                {/* Project Tools */}
                <div className="py-1 flex gap-2 items-center font-sfMono">
                    {project.tools.map((tool, index) => (
                        <p key={index} className="text-xs text-slate">
                            {tool}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Work;
