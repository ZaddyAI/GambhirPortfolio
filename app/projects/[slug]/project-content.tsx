"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import Spotlight from "@/components/spotlight"
import ImageViewer from "@/components/image-viewer"
import { getProjectBySlug } from "@/lib/constants"
import { IconGitHub, IconExternal, IconFolder, IconPlayStore, IconDownload, IconChevronLeft, IconChevronRight } from "@/components/icons"
import { useToast } from "@/hooks/use-toast"

export default function ProjectContent() {
  const params = useParams()
  const slug = params.slug as string
  const project = getProjectBySlug(slug)
  const { toast } = useToast()

  useEffect(() => {
    if (project && (!project.details || project.details.length === 0)) {
      const { dismiss } = toast({
        variant: "info",
        title: "No documentation available",
        description: `Detailed documentation for ${project.title} has not been added yet.`,
      })
      const timer = setTimeout(() => dismiss(), 3000)
      return () => clearTimeout(timer)
    }
  }, [project])

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    if (lightboxIndex === null || !project?.images) return
    setLightboxIndex((lightboxIndex + 1) % project.images!.length)
  }, [lightboxIndex, project])

  const goPrev = useCallback(() => {
    if (lightboxIndex === null || !project?.images) return
    setLightboxIndex((lightboxIndex - 1 + project.images!.length) % project.images!.length)
  }, [lightboxIndex, project])

  const carouselNext = useCallback(() => {
    if (!project?.images) return
    setCarouselIndex((carouselIndex + 1) % project.images.length)
  }, [carouselIndex, project])

  const carouselPrev = useCallback(() => {
    if (!project?.images) return
    setCarouselIndex((carouselIndex - 1 + project.images.length) % project.images.length)
  }, [carouselIndex, project])

  const handleDownloadImage = useCallback(() => {
    if (!project?.images) return
    const link = document.createElement("a")
    link.href = project.images[carouselIndex]
    link.download = `${project.title.toLowerCase().replace(/\s+/g, "-")}-screenshot-${carouselIndex + 1}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [project, carouselIndex])

  const getImageName = (path: string) => {
    const filename = path.split("/").pop() || ""
    return filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#e2e8f0] mb-4">Project Not Found</h1>
          <p className="text-[#94a3b8] mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/project-archive" className="button-primary">
            <span>Back to Archive</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Spotlight />
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-20 lg:px-0 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 lg:pt-32 pb-24"
          >
            <Link
              href="/project-archive"
              className="inline-flex items-center gap-2 text-[#5eead4] hover:text-[#2dd4bf] transition-colors mb-10 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Archive</span>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b] font-mono">
                {project.year}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#334155]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5eead4] font-mono">
                {project.madeAt}
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#e2e8f0] sm:text-4xl mb-5">
              {project.title}
            </h1>

            <p className="text-[#94a3b8] leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10 pb-10 border-b border-[#1e293b]">
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, i) => (
                  <span key={i} className="tool-tag">{tool}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 ml-auto">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e293b] text-[#94a3b8] hover:text-[#5eead4] hover:bg-[#334155] transition-colors text-sm font-medium"
                  >
                    <IconGitHub className="w-4 h-4" />
                    Source
                  </a>
                )}
                {project.externalLink && (
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e293b] text-[#94a3b8] hover:text-[#5eead4] hover:bg-[#334155] transition-colors text-sm font-medium"
                  >
                    <IconExternal className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.playstoreLink && (
                  <a
                    href={project.playstoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e293b] text-[#94a3b8] hover:text-[#5eead4] hover:bg-[#334155] transition-colors text-sm font-medium"
                  >
                    <IconPlayStore className="w-4 h-4" />
                    Play Store
                  </a>
                )}
              </div>
            </div>

            {project.images && project.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="mb-10 pb-10 border-b border-[#1e293b]"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="section-number">01.</span>
                  <h2 className="text-sm font-semibold text-[#e2e8f0] uppercase tracking-wider">
                    Screenshots
                  </h2>
                  <div className="flex-1 h-px bg-[#1e293b]" />
                </div>
                <div
                  className="rounded-xl overflow-hidden border border-[#334155] bg-[#0f172a] cursor-pointer flex items-center justify-center"
                  onClick={() => setLightboxIndex(carouselIndex)}
                >
                  <Image
                    src={project.images[carouselIndex]}
                    alt={`${project.title} screenshot ${carouselIndex + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-auto max-h-[500px] object-contain"
                  />
                </div>

                <div className="mt-4 p-3 rounded-2xl bg-[#1e293b]/90 backdrop-blur-md border border-[#334155]">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <button
                      onClick={carouselPrev}
                      disabled={carouselIndex === 0}
                      className={`w-9 h-9 rounded-full border bg-[#0f172a]/50 flex items-center justify-center transition-all shrink-0 ${
                        carouselIndex === 0
                          ? "border-[#1e293b] text-[#475569]"
                          : "border-[#334155] text-[#e2e8f0] hover:bg-[#334155]"
                      }`}
                      aria-label="Previous image"
                    >
                      <IconChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={carouselNext}
                      disabled={carouselIndex === project.images.length - 1}
                      className={`w-9 h-9 rounded-full border bg-[#0f172a]/50 flex items-center justify-center transition-all shrink-0 ${
                        carouselIndex === project.images.length - 1
                          ? "border-[#1e293b] text-[#475569]"
                          : "border-[#334155] text-[#e2e8f0] hover:bg-[#334155]"
                      }`}
                      aria-label="Next image"
                    >
                      <IconChevronRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2 text-sm ml-2 min-w-0 overflow-hidden">
                      <span className="text-[#5eead4] font-semibold font-mono capitalize truncate">{getImageName(project.images[carouselIndex])}</span>
                      <span className="text-[#64748b] hidden sm:inline">/</span>
                      <span className="text-[#e2e8f0] truncate hidden sm:inline">{project.title}</span>
                      <span className="text-[#64748b] ml-auto shrink-0">
                        {carouselIndex + 1} / {project.images.length}
                      </span>
                    </div>

                    <button
                      onClick={handleDownloadImage}
                      className="ml-auto button-primary !py-2 !px-3 sm:!px-4 !text-xs shrink-0"
                    >
                      <IconDownload className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {project.details && project.details.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="section-number">02.</span>
                  <h2 className="text-sm font-semibold text-[#e2e8f0] uppercase tracking-wider">
                    Documentation
                  </h2>
                  <div className="flex-1 h-px bg-[#1e293b]" />
                </div>
                <div className="space-y-4">
                  {project.details.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.06 }}
                      className="text-[#94a3b8] leading-relaxed text-[15px]"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {lightboxIndex !== null && project.images && (
        <ImageViewer
          images={project.images}
          index={lightboxIndex}
          title={project.title}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          onGoTo={setLightboxIndex}
        />
      )}
    </>
  )
}
