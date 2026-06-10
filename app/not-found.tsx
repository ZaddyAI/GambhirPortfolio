"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Spotlight from "@/components/spotlight"

export default function NotFound() {
  const [showToast, setShowToast] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Spotlight />
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-4 right-4 z-[100] max-w-[380px] rounded-md border border-[#5eead4]/30 bg-[#1e293b] p-4 pr-8 shadow-lg"
          >
            <p className="text-sm font-semibold text-[#e2e8f0]">Page not found</p>
            <p className="text-sm opacity-90 text-[#94a3b8] mt-1">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <button
              onClick={() => setShowToast(false)}
              className="absolute right-2 top-2 rounded-md p-1 text-[#94a3b8] opacity-50 hover:opacity-100 transition-opacity"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
              </svg>
            </button>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5eead4]/30">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
                className="h-full bg-[#5eead4]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-[#5eead4] font-mono text-7xl sm:text-8xl font-bold mb-4"
          >
            404
          </motion.p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#e2e8f0] mb-4">
            Page Not Found
          </h1>
          <p className="text-[#94a3b8] leading-relaxed mb-10 text-[15px]">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="button-primary inline-flex"
          >
            <span>Go Home</span>
          </Link>
        </motion.div>
      </div>
    </>
  )
}
