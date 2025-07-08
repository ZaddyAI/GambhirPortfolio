import IconExternal from "./icons/external.jsx"
import IconFolder from "./icons/folder.jsx"
import IconGitHub from "./icons/github.jsx"
import { projects } from "../constants"

function Work() {
  const visibleProjects = projects.slice(0, 6)
  const hasMoreProjects = projects.length > 6

  return (
    <section
      className="w-full px-2 sm:px-0 sm:w-[90%] lg:w-[85%] xl:w-[80%] sm:ml-10 lg:ml-20 py-12 sm:py-16 lg:py-20"
      id="works"
    >
      {/* Section Heading */}
      <div className="flex items-center space-x-2 sm:space-x-4 mb-8 sm:mb-10">
        <span className="text-green font-sfMono text-sm sm:text-lg">03.</span>
        <h2 className="font-calibre font-semibold text-xl sm:text-heading text-lightest-slate whitespace-nowrap">
          Some Things I've Built
        </h2>
        <div className="w-[150px] sm:w-[200px] lg:w-[350px] h-px bg-lightest-navy"></div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {/* View All Projects Button */}
      {hasMoreProjects && (
        <div className="flex justify-start mt-8 sm:mt-10">
          <a
            href="/project-archive"
            className="text-white font-bold hover:text-green transition-all duration-300 flex items-center gap-2 group text-sm sm:text-base"
          >
            View Full Project Archive
            <span className="inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
              ↗
            </span>
          </a>
        </div>
      )}
    </section>
  )
}

// ProjectCard Component
interface Project {
  title: string
  description: string
  tools: string[]
  githubLink?: string
  externalLink?: string
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="w-full project-inner hover:-translate-y-2 transition-transform duration-300">
      <div className="flex flex-col justify-between h-full">
        {/* Project Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-[40px] sm:w-[50px] text-green">
            <IconFolder />
          </div>
          <div className="flex items-center space-x-3">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green w-5 h-5 transition-colors duration-300"
              >
                <IconGitHub />
              </a>
            )}
            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green w-5 h-5 transition-colors duration-300"
              >
                <IconExternal />
              </a>
            )}
          </div>
        </div>

        {/* Project Title */}
        <div className="mb-4">
          <h3 className="font-calibre text-lg sm:text-xxl text-lightest-slate font-bold project-title transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        {/* Project Description */}
        <div className="text-slate text-sm sm:text-[17px] font-calibre mb-6 flex-grow line-height-2">
          <p className="overflow-hidden">{project.description}</p>
        </div>

        {/* Project Tools */}
        <div className="flex flex-wrap gap-2 font-sfMono">
          {project.tools.map((tool, index) => (
            <span key={index} className="tool">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Work
