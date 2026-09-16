"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { IconChevronLeft, IconChevronRight, IconDownload } from "@/components/icons"

interface ImageViewerProps {
  images: string[]
  index: number
  title: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onGoTo: (index: number) => void
}

export default function ImageViewer({
  images,
  index,
  title,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: ImageViewerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrev()
    },
    [onClose, onNext, onPrev]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  const handleDownload = useCallback(() => {
    const link = document.createElement("a")
    link.href = images[index]
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}-screenshot-${index + 1}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [images, index, title])

  const getImageName = (path: string) => {
    const filename = path.split("/").pop() || ""
    return filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col bg-[#0f172a]/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1e293b] text-[#94a3b8] hover:text-[#e2e8f0] flex items-center justify-center transition-colors border border-[#334155] z-10"
        aria-label="Close"
      >
        ✕
      </button>

      <div
        className="flex-1 flex items-center justify-center p-8 pt-16 pb-32"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-full max-h-full"
          >
            <Image
              src={images[index]}
              alt={`${title} screenshot ${index + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4">
        <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-[#1e293b]/90 backdrop-blur-md border border-[#334155]">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            disabled={images.length <= 1}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#334155] bg-[#0f172a]/50 text-[#e2e8f0] flex items-center justify-center hover:bg-[#334155] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#0f172a]/50 shrink-0"
            aria-label="Previous image"
          >
            <IconChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            disabled={images.length <= 1}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#334155] bg-[#0f172a]/50 text-[#e2e8f0] flex items-center justify-center hover:bg-[#334155] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#0f172a]/50 shrink-0"
            aria-label="Next image"
          >
            <IconChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-2 text-sm ml-2 min-w-0">
            <span className="text-[#5eead4] font-semibold font-mono hidden sm:inline capitalize">{getImageName(images[index])}</span>
            <span className="text-[#64748b] hidden sm:inline">/</span>
            <span className="text-[#e2e8f0] truncate hidden sm:inline">{title}</span>
            <span className="text-[#64748b] ml-auto sm:ml-2 shrink-0">
              {index + 1} / {images.length}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDownload()
            }}
            className="ml-auto button-primary !py-2 !px-3 sm:!px-4 !text-xs shrink-0"
          >
            <IconDownload className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
