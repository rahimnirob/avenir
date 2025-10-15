"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import Navbar from "@/components/shared/navbar"
import Sidebar from "@/components/shared/sidebar"
import Terminal from "@/components/shared/terminal"
import MainLayout from "@/components/shared/main-layout"

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: number; top: number; duration: number; delay: number }>>([])

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        top: 80 + Math.random() * 20,
        duration: 5 + Math.random() * 3,
        delay: Math.random() * 5,
      }))
    )
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <>
      <Navbar />
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center p-6 md:p-8 relative">
          {/* Animated Background */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
            
            {/* Floating Particles - Only render after mount */}
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                animate={{
                  y: [0, -150, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
              />
            ))}
          </div>

          <div className="w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                WELCOME TO AVENIR
              </h1>
              <p className="text-gray-400 font-mono text-sm md:text-base tracking-wider">
                WHERE THE FUTURE LIVES BEFORE REALITY
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              {/* Video Container with Aesthetic Border */}
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                {/* Glowing Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/60 z-10" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400/60 z-10" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-400/60 z-10" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/60 z-10" />

                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                >
                  <source src="/home.mp4" type="video/mp4" />
                  
                  {/* Fallback */}
                  <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <h2 className="text-3xl md:text-5xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        AVENIR
                      </h2>
                      <p className="text-gray-400 font-mono">Loading experience...</p>
                    </div>
                  </div>
                </video>

                {/* Volume Control Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showControls ? 1 : 0 }}
                  className="absolute bottom-4 right-4 z-10"
                >
                  <button
                    onClick={toggleMute}
                    className="p-3 rounded-full bg-black/60 backdrop-blur-sm border border-cyan-400/30 text-cyan-400 hover:bg-black/80 hover:border-cyan-400/60 transition-all duration-300"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </motion.div>

                {/* Scanning Line Effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ y: "-100%" }}
                  animate={{ y: "100%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                </motion.div>
              </div>

              {/* Info Bar Below Video */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 flex items-center justify-center gap-6 text-xs font-mono text-gray-500"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>LIVE FEED</span>
                </div>
                <div className="w-px h-4 bg-gray-700" />
                <span>PLATFORM ACTIVE</span>
                <div className="w-px h-4 bg-gray-700" />
                <span>SYSTEM NOMINAL</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </MainLayout>
      <Sidebar />
      <Terminal />
    </>
  )
}