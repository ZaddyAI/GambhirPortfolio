"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import Spotlight from "@/components/spotlight"
import { getProjectBySlug } from "@/lib/constants"
import { IconGitHub, IconExternal, IconFolder, IconPlayStore } from "@/components/icons"
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
                <h2 className="text-sm font-semibold text-[#e2e8f0] mb-5 uppercase tracking-wider">
                  Screenshots
                </h2>
                <div className="relative group">
                  <div
                    className="rounded-lg overflow-hidden border border-[#334155] bg-[#1e293b] cursor-pointer flex items-center justify-center"
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

                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={carouselPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0f172a]/80 text-[#e2e8f0] flex items-center justify-center hover:bg-[#1e293b] transition-all opacity-0 group-hover:opacity-100 text-base border border-[#334155]"
                      >
                        ←
                      </button>
                      <button
                        onClick={carouselNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0f172a]/80 text-[#e2e8f0] flex items-center justify-center hover:bg-[#1e293b] transition-all opacity-0 group-hover:opacity-100 text-base border border-[#334155]"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>

                {project.images.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCarouselIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === carouselIndex
                          ? "bg-[#5eead4] w-4"
                          : "bg-[#334155] hover:bg-[#475569] w-2"
                          }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {project.details && project.details.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-sm font-semibold text-[#e2e8f0] mb-5 uppercase tracking-wider">
                  Documentation
                </h2>
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
        <Lightbox
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

function Lightbox({
  images,
  index,
  title,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: {
  images: string[]
  index: number
  title: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onGoTo: (index: number) => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrev()
    }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        key={index}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="relative inline-flex max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`${title} screenshot ${index + 1}`}
          width={1200}
          height={800}
          className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
          priority
        />

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#1e293b] text-[#94a3b8] hover:text-[#e2e8f0] flex items-center justify-center text-sm transition-colors shadow-lg border border-[#334155]"
        >
          ✕
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev() }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#1e293b]/80 text-[#e2e8f0] flex items-center justify-center hover:bg-[#334155] transition-colors text-base"
            >
              ←
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext() }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#1e293b]/80 text-[#e2e8f0] flex items-center justify-center hover:bg-[#334155] transition-colors text-base"
            >
              →
            </button>
          </>
        )}

        <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm text-[#64748b] whitespace-nowrap">
          {index + 1} / {images.length}
        </p>

        {images.length > 1 && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); onGoTo(i) }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index
                  ? "bg-[#5eead4] w-4"
                  : "bg-[#334155] hover:bg-[#475569]"
                  }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
