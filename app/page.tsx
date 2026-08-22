"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import Spotlight from "@/components/spotlight"
import {
  name,
  aboutDescription,
  aboutParagraph2,
  skills,
  experiencesData,
  projects,
  socialLinks,
  email,
  aboutParagraphs
} from "@/lib/constants"
import { IconGitHub, IconLinkedin, IconExternal, IconFolder, IconInstagram, IconWhatsapp, IconPlayStore } from "@/components/icons"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("about")
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setIsLoading(false)
    }
    window.addEventListener('pageshow', onPageShow)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      <div className={isLoading ? 'invisible' : ''}>
        <Spotlight />
        <motion.div
          className="scroll-progress"
          style={{ scaleX }}
        />

        <div className="min-h-screen bg-background">
          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-4">
              {/* Left Column - Sticky */}
              <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold tracking-tight text-[#e2e8f0] sm:text-5xl"
                  >
                    <a href="/">{name}</a>
                  </motion.h1>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-3 text-lg font-medium tracking-tight text-[#5eead4] sm:text-xl"
                  >
                    Software Developer
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-4 max-w-xs leading-relaxed text-[#94a3b8]"
                  >

                    {aboutDescription}
                  </motion.p>

                  {/* Navigation */}
                  <nav className="nav hidden lg:block mt-16" aria-label="In-page jump links">
                    <motion.ul
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="w-max"
                    >
                      {["about", "experience", "projects"].map((item, index) => (
                        <li key={item}>
                          <a
                            href={`#${item}`}
                            className={`nav-link group ${activeSection === item ? "active" : ""}`}
                            style={{ transitionDelay: `${index * 50}ms` }}
                          >
                            <span>{item}</span>
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  </nav>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-6"
                  >
                    <a
                      href="/resume"
                      className="button-primary !py-2.5 !px-5 !text-xs"
                    >
                      <span>Resume</span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </motion.div>
                </div>

                {/* Social Links */}
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="ml-1 mt-8 flex items-center gap-5"
                  aria-label="Social media"
                >

                  <li>
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon block"
                      aria-label="GitHub"
                    >
                      <IconGitHub className="h-6 w-6" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon block"
                      aria-label="LinkedIn"
                    >
                      <IconLinkedin className="h-6 w-6" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon block"
                      aria-label="Instagram"
                    >
                      <IconInstagram className="h-6 w-6" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon block"
                      aria-label="WhatsApp"
                    >
                      <IconWhatsapp className="h-6 w-6" />
                    </a>
                  </li>
                </motion.ul>
              </header>

              {/* Right Column - Scrollable Content */}
              <main className="pt-24 lg:w-1/2 lg:py-24">
                <AboutSection />
                <ExperienceSection />
                <ProjectsSection />
                <ContactSection />
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f172a]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <Image
          src="/greenLogo.png"
          alt="Logo"
          width={96}
          height={96}
          className="w-24 h-24"
          priority
        />

        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(94, 234, 212, 0.2) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        className="mt-8 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="w-32 h-1 bg-[#1e293b] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#5eead4] to-[#2dd4bf] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          />
        </div>
        <motion.p
          className="text-xs text-[#64748b] font-mono tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

function AboutSection() {
  return (
    <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <SectionHeader number="01" title="About" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-4 text-[#94a3b8] leading-relaxed">
          {aboutParagraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
          <p>{aboutParagraph2}</p>
        </div>

        <div className="mt-8">
          <p className="text-sm text-[#94a3b8] mb-4">
            Here are a few technologies I&apos;ve been working with recently:
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-mono text-[#94a3b8]">
            {skills.map((skill, index) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ x: 4, color: "#e2e8f0" }}
                className="flex items-center gap-2 cursor-default"
              >
                <motion.span
                  className="text-[#5eead4]"
                  whileHover={{ scale: 1.2 }}
                >
                  ▹
                </motion.span>
                {skill}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <SectionHeader number="02" title="Experience" />

      <div className="space-y-6">
        {experiencesData.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
          >
            <motion.a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="experience-card group block"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <header className="text-xs font-semibold uppercase tracking-wide text-[#64748b] sm:w-1/4 shrink-0 mt-1 font-mono">
                  {job.range}
                </header>
                <div className="sm:w-3/4">
                  <h3 className="font-medium text-[#e2e8f0] group-hover:text-[#5eead4] transition-colors duration-300 leading-tight">
                    {job.title} ·{" "}
                    <span className="inline-flex items-center gap-1">
                      {job.company}
                      <motion.span
                        initial={{ x: -4, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        <IconExternal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </motion.span>
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-[#64748b]">{job.location}</p>
                  <ul className="mt-3 space-y-2 text-sm text-[#94a3b8] leading-relaxed">
                    {job.description.map((desc, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#5eead4] shrink-0 mt-1">▹</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                  <motion.ul
                    className="mt-4 flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {job.tools?.map((tool, i) => (
                      <motion.li
                        key={i}
                        className="tool-tag"
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tool}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ProjectsSection() {
  const router = useRouter()
  const displayedProjects = projects.slice(0, 4)
  return (
    <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <SectionHeader number="03" title="Projects" />

      <div className="space-y-6">
        {displayedProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          >
            <motion.div
              className="experience-card group block cursor-pointer"
              onClick={() => router.push(`/projects/${project.slug}`)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/4 shrink-0">
                  <motion.div
                    className="w-full aspect-video rounded-lg bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center overflow-hidden border border-[#334155] group-hover:border-[#5eead4]/40 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconFolder className="w-10 h-10 text-[#5eead4] group-hover:text-[#2dd4bf] transition-colors" />
                    </motion.div>
                  </motion.div>
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
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.tools.map((tool, i) => (
                      <motion.li
                        key={i}
                        className="tool-tag"
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tool}
                      </motion.li>
                    ))}
                  </motion.ul>
                  <div className="mt-3 flex items-center gap-2">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex p-2 rounded-md bg-[#1e293b] text-[#94a3b8] hover:text-[#5eead4] hover:bg-[#334155] transition-colors !z-[50]"
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
                        className="inline-flex p-2 rounded-md bg-[#1e293b] text-[#94a3b8] hover:text-[#5eead4] hover:bg-[#334155] transition-colors !z-[50]"
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
                        className="inline-flex p-2 rounded-md bg-[#1e293b] text-[#94a3b8] hover:text-[#5eead4] hover:bg-[#334155] transition-colors !z-[50]"
                      >
                        <IconPlayStore className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12"
      >
        <a
          href="/project-archive"
          className="inline-flex items-center gap-2 text-[#e2e8f0] font-medium hover:text-[#5eead4] transition-colors group"
        >
          View Full Project Archive
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </motion.div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="mb-16 scroll-mt-16 md:mb-24 lg:scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.p
          className="section-number mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          04. What&apos;s Next?
        </motion.p>
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-[#e2e8f0] mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-[#94a3b8] mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          I&apos;m currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I&apos;ll try my best to get back to you!
        </motion.p>
        <motion.a
          href={`mailto:${email}`}
          className="button-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <span>Say Hello</span>
        </motion.a>
      </motion.div>

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
    </section>
  )
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0f172a]/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
    >
      <h2 className="text-sm font-bold uppercase tracking-widest text-[#e2e8f0] lg:sr-only">
        {title}
      </h2>
    </motion.div>
  )
}
