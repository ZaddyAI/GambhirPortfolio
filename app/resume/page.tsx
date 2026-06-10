"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function Page() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {showLoader && (
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
        )}
      </AnimatePresence>

      <div className={showLoader ? 'invisible' : ''} style={{ width: '100vw', height: '100vh' }}>
        <iframe
          src="/gambhir.pdf"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>
    </>
  )
}
