"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Spotlight from "@/components/spotlight"
import { projects } from "@/lib/constants"
import { IconGitHub, IconExternal, IconPlayStore } from "@/components/icons"

export default function ProjectArchive() {
  const router = useRouter()
  const sortedProjects = [...projects].sort((a, b) => b.year - a.year)

  return (
    <>
      <Spotlight />
      <div className="min-h-screen bg-background">
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 lg:pt-32 pb-16"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#5eead4] hover:text-[#2dd4bf] transition-colors mb-6 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Home</span>
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-[#e2e8f0] sm:text-5xl mb-4">
              Project Archive
            </h1>
            <p className="text-[#94a3b8] max-w-xl">
              A collection of projects I&apos;ve worked on, ranging from personal experiments to professional work.
            </p>
          </motion.div>

          <div className="space-y-4">
            {sortedProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="experience-card group block cursor-pointer"
                onClick={() => router.push(`/projects/${project.slug}`)}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-1/4 shrink-0">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#64748b] mt-1 font-mono">
                      {project.year}
                    </div>
                  </div>
                  <div className="sm:w-3/4">
                    <h3 className="font-medium text-[#e2e8f0] group-hover:text-[#5eead4] transition-colors duration-300 leading-tight flex items-center gap-2">
                      {project.title}
                      <IconExternal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                    <p className="mt-2 text-sm text-[#94a3b8] leading-relaxed">
                      {project.description}
                    </p>
                    <motion.ul
                      className="mt-4 flex flex-wrap gap-2"
                    >
                      {project.tools.map((tool, i) => (
                        <motion.li
                          key={i}
                          className="tool-tag"
                        >
                          {tool}
                        </motion.li>
                      ))}
                    </motion.ul>
                    <div className="mt-3 flex items-center gap-2 relative z-10">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="relative p-2 rounded-md bg-[#1e293b] text-[#94a3b8] hover:text-[#5eead4] hover:bg-[#334155] transition-colors z-20"
                        >
                          <IconGitHub className="w-5 h-5" />
                        </a>
                      )}
                      {project.externalLink && (
                        <a
                          href={project.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="relative p-2 rounded-md bg-[#1e293b] text-[#94a3b8] hover:text-[#5eead4] hover:bg-[#334155] transition-colors z-20"
                        >
                          <IconExternal className="w-5 h-5" />
                        </a>
                      )}
                      {project.playstoreLink && (
                        <a
                          href={project.playstoreLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="relative p-2 rounded-md bg-[#1e293b] text-[#94a3b8] hover:text-[#5eead4] hover:bg-[#334155] transition-colors z-20"
                        >
                          <IconPlayStore className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-32 pb-8 text-center text-sm text-[#64748b]"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-[#334155] to-transparent mx-auto mb-8"
            />
            <p className="mb-2">
              Built by{" "}
              <a href="https://gambhirpoudel.com.np" className="text-[#94a3b8] hover:text-[#5eead4] transition-colors" target="_blank" rel="noopener noreferrer">
                Gambhir Poudel
              </a>
            </p>
          </motion.footer>
        </div>
      </div>
    </>
  )
}