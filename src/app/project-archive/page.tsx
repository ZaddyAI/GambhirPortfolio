"use client"

import Link from "next/link"
import { projects, name } from "../constants"
import { useState } from "react"

const Page = () => {
    const [expandedRow, setExpandedRow] = useState<number | null>(null)
    const sortedProjects = [...projects].sort((a, b) => b.year - a.year)

    const handleRowClick = (index: number, project: typeof projects[0]) => {
        // If there's a link, open it
        if (project.externalLink || project.githubLink) {
            window.open(project.externalLink || project.githubLink, '_blank', 'noopener,noreferrer')
        } else {
            // If no link, toggle the expanded view
            setExpandedRow(expandedRow === index ? null : index)
        }
    }

    return (
        <section
            className="absolute top-0 z-[-2] min-h-screen w-screen mx-auto overflow-x-hidden bg-navy line-height-2 p-0 m-0 text-light-slate antialiased selection:bg-lightest-navy selection:text-green"
            id="project-archive"
        >
            <div className="p-6 sm:p-10 lg:p-20">
                {/* Section Heading */}
                <div className="flex flex-col mb-8 sm:mb-10">
                    {/* Back Arrow and Name */}
                    <Link href="/">
                        <div className="flex items-center gap-2 group mb-4">
                            <span className="text-green font-calibre font-semibold text-md sm:text-lg hover:text-green transition-all duration-300 flex items-center gap-1">
                                <span className="inline-block group-hover:-translate-x-1 transition-transform duration-300">←</span>
                                <span className="text-green font-calibre font-semibold">{name}</span>
                            </span>
                        </div>
                    </Link>
                    <h2 className="font-calibre font-semibold text-2xl sm:text-heading2 text-lightest-slate line-height-1">
                        All Projects
                    </h2>
                </div>

                {/* Desktop Table - Hidden on mobile */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full border-collapse min-w-[600px]">
                        <thead>
                            <tr className="text-left border-b border-lightest-navy">
                                <th className="py-3 px-4 font-bold font-calibre text-sm text-white w-[10%]">Year</th>
                                <th className="py-3 px-4 font-bold font-calibre text-sm text-white w-[25%]">
                                    Project
                                </th>
                                <th className="py-3 px-4 font-bold font-calibre text-sm text-white w-[15%]">
                                    Made At
                                </th>
                                <th className="py-3 px-4 font-bold font-calibre text-sm text-white w-[35%]">
                                    Built With
                                </th>
                                <th className="py-3 px-4 font-bold font-calibre text-sm text-white w-[15%]">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProjects.map((project, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-lightest-navy hover:bg-lightest-navy transition-colors duration-300"
                                >
                                    <td className="py-4 px-4 font-sfMono text-xs text-slate">{project.year}</td>
                                    <td className="py-4 px-4 font-calibre font-semibold text-md text-white">
                                        {project.title}
                                    </td>
                                    <td className="py-4 px-4 font-calibre text-md text-slate">
                                        {project.madeAt || "N/A"}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tools.slice(0, 3).map((tool, idx) => (
                                                <span key={idx} className="tool text-xs">
                                                    {tool}
                                                </span>
                                            ))}
                                            {project.tools.length > 3 && (
                                                <span className="text-slate text-xs">+{project.tools.length - 3}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 font-calibre text-md text-slate">
                                        {project.externalLink || project.githubLink ? (
                                            <a
                                                href={project.externalLink || project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate hover:text-green transition-all duration-300 flex items-center gap-1 group"
                                            >
                                                <span className="truncate max-w-[120px]">
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

                {/* Mobile List - Only shows year and project, click to open link */}
                <div className="sm:hidden">
                    {sortedProjects.map((project, index) => (
                        <div
                            key={index}
                            className={`border-b border-lightest-navy py-4 px-2 transition-all duration-300 ${expandedRow === index ? 'bg-lightest-navy/50' : ''}`}
                            onClick={() => handleRowClick(index, project)}
                        >
                            <div className="flex items-center justify-between cursor-pointer group">
                                {/* Year and Project Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-4">
                                        <div className="font-sfMono text-xs text-slate min-w-[50px]">
                                            {project.year}
                                        </div>
                                        <div className="font-calibre font-semibold text-md text-white group-hover:text-green transition-colors duration-300 flex-1">
                                            {project.title}
                                            {(project.externalLink || project.githubLink) && (
                                                <span className="ml-2 text-slate group-hover:text-green transition-colors duration-300 inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1">
                                                    ↗
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    {expandedRow === index && (
                                        <div className="mt-4 pl-[66px] space-y-3 animate-fadeIn">
                                            {/* Made At */}
                                            {project.madeAt && (
                                                <div>
                                                    <div className="text-xs text-slate font-sfMono mb-1">Made At</div>
                                                    <div className="font-calibre text-sm text-light-slate">{project.madeAt}</div>
                                                </div>
                                            )}

                                            {/* Built With */}
                                            {project.tools.length > 0 && (
                                                <div>
                                                    <div className="text-xs text-slate font-sfMono mb-1">Built With</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tools.map((tool, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="tool text-xs bg-light-navy/50 text-slate px-3 py-1 rounded"
                                                            >
                                                                {tool}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Link (if not clicked directly) */}
                                            {!(project.externalLink || project.githubLink) && (
                                                <div>
                                                    <div className="text-xs text-slate font-sfMono mb-1">Link</div>
                                                    <div className="font-calibre text-sm text-slate">No link available</div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Page
