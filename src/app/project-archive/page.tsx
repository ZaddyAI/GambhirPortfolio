import React from "react";
import Link from "next/link";
import { projects, name } from "../constants"; // Import your projects data

const page = () => {
    // Sort projects by year in descending order (most recent first)
    const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

    return (
        <section className="w-full h-full bg-navy" id="project-archive">
            <div className="p-10 sm:p-20">
                {/* Section Heading */}
                <div className="flex flex-col mb-10">
                    {/* Back Arrow and Name */}
                    <Link href="/"> {/* Link to the home page */}
                        <div className="flex items-center gap-2 group">
                            <span className="text-green font-calibre font-semibold sm:text-lg text-md hover:text-green transition-all duration-300 flex items-center gap-1">
                                <span className="inline-block group-hover:-translate-x-1 transition-transform duration-300">
                                    ←
                                </span>
                                <span className="text-green font-calibre font-semibold sm:text-lg text-md">
                                    {name}
                                </span>
                            </span>
                        </div>
                    </Link>

                    <h2 className="font-calibre font-semibold sm:text-heading2 text-xxl text-lightest-slate">
                        All Projects
                    </h2>
                </div>

                {/* Projects Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left border-b border-lightest-navy">
                                <th className="py-2 px-4 font-bold font-calibre text-sm text-white w-[10%]">Year</th>
                                <th className="py-2 px-4 font-bold font-calibre text-sm text-white w-[20%]">Project</th>
                                <th className="py-2 px-4 font-bold font-calibre text-sm text-white w-[15%]">Made At</th>
                                <th className="py-2 px-4 font-bold font-calibre text-sm text-white w-[35%]">Built With</th>
                                <th className="py-2 px-4 font-bold font-calibre text-sm text-white w-[20%]">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProjects.map((project, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-lightest-navy hover:bg-lightest-navy transition-colors duration-300"
                                >
                                    {/* Year Column */}
                                    <td className="py-4 px-4 font-sfMono text-xs text-slate w-[10%]">
                                        {project.year}
                                    </td>

                                    {/* Project Title Column */}
                                    <td className="py-4 px-4 font-calibre font-semibold text-md text-white w-[20%]">
                                        {project.title}
                                    </td>

                                    {/* Made At Column */}
                                    <td className="py-4 px-4 font-calibre text-md text-slate w-[15%]">
                                        {project.madeAt || "N/A"}
                                    </td>

                                    {/* Built With Column */}
                                    <td className="py-4 px-4 w-[35%]">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tools.map((tool, index) => (
                                                <span
                                                    key={index}
                                                    className="tool"
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </td>

                                    {/* Link Column */}
                                    <td className="py-4 px-4 font-calibre text-md text-slate w-[20%]">
                                        {project.externalLink || project.githubLink ? (
                                            <a
                                                href={project.externalLink || project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate hover:text-green transition-all duration-300 flex items-center gap-1 group"
                                            >
                                                <span className="truncate max-w-[100px] sm:max-w-[150px]">
                                                    {project.externalLink
                                                        ? project.externalLink.replace(/^https?:\/\//, "")
                                                        : project.githubLink.replace(/^https?:\/\//, "")}
                                                </span>
                                                <span className="inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                                                    ↗
                                                </span>
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default page;
