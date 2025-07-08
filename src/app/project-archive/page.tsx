"use client"

import Link from "next/link"
import { projects, name } from "../constants"

const page = () => {
  const sortedProjects = [...projects].sort((a, b) => b.year - a.year)

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

        {/* Projects Table */}
        <div className="overflow-x-auto mobile-scroll">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="text-left border-b border-lightest-navy">
                <th className="py-3 px-2 sm:px-4 font-bold font-calibre text-xs sm:text-sm text-white w-[10%]">Year</th>
                <th className="py-3 px-2 sm:px-4 font-bold font-calibre text-xs sm:text-sm text-white w-[25%]">
                  Project
                </th>
                <th className="py-3 px-2 sm:px-4 font-bold font-calibre text-xs sm:text-sm text-white w-[15%] hidden sm:table-cell">
                  Made At
                </th>
                <th className="py-3 px-2 sm:px-4 font-bold font-calibre text-xs sm:text-sm text-white w-[35%]">
                  Built With
                </th>
                <th className="py-3 px-2 sm:px-4 font-bold font-calibre text-xs sm:text-sm text-white w-[15%]">Link</th>
              </tr>
            </thead>
            <tbody>
              {sortedProjects.map((project, index) => (
                <tr
                  key={index}
                  className="border-b border-lightest-navy hover:bg-lightest-navy transition-colors duration-300"
                >
                  {/* Year Column */}
                  <td className="py-3 sm:py-4 px-2 sm:px-4 font-sfMono text-xs text-slate">{project.year}</td>

                  {/* Project Title Column */}
                  <td className="py-3 sm:py-4 px-2 sm:px-4 font-calibre font-semibold text-sm sm:text-md text-white">
                    {project.title}
                  </td>

                  {/* Made At Column - Hidden on mobile */}
                  <td className="py-3 sm:py-4 px-2 sm:px-4 font-calibre text-sm sm:text-md text-slate hidden sm:table-cell">
                    {project.madeAt || "N/A"}
                  </td>

                  {/* Built With Column */}
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {project.tools.slice(0, 3).map((tool, index) => (
                        <span key={index} className="tool text-xs">
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="text-slate text-xs">+{project.tools.length - 3}</span>
                      )}
                    </div>
                  </td>

                  {/* Link Column */}
                  <td className="py-3 sm:py-4 px-2 sm:px-4 font-calibre text-xs sm:text-md text-slate">
                    {project.externalLink || project.githubLink ? (
                      <a
                        href={project.externalLink || project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate hover:text-green transition-all duration-300 flex items-center gap-1 group"
                      >
                        <span className="truncate max-w-[80px] sm:max-w-[120px]">
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
  )
}

export default page
