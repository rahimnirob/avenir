"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, ArrowRight, Sparkles } from "lucide-react"

export default function PreHomePage() {
  const router = useRouter()
  const [videoEnded, setVideoEnded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleVideoEnd = () => {
    setVideoEnded(true)
    setTimeout(() => {
      router.push("/home")
    }, 2000)
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const skipToMain = () => {
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Large animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[700px] h-[700px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7.5,
          }}
        />

        {/* Animated particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${80 + Math.random() * 20}%`,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black z-50 flex items-center justify-center rounded-xl"
            >
              <div className="text-center space-y-8">
                <motion.div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border-2 border-purple-400 border-t-transparent rounded-full"
                  />
                </motion.div>
                <div className="space-y-2">
                  <p className="text-cyan-400 font-mono tracking-wider text-lg">INITIALIZING...</p>
                  <motion.div
                    className="flex items-center justify-center gap-1"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative"
        >
          {/* Video container with enhanced styling */}
          <div
            className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-cyan-500/40 shadow-2xl shadow-cyan-500/20"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(0, 0, 0, 0.95) 50%, rgba(139, 92, 246, 0.05) 100%)',
            }}
          >
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-cyan-400/50 z-10" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-cyan-400/50 z-10" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-cyan-400/50 z-10" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-cyan-400/50 z-10" />

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl">
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.3)",
                    "0 0 40px rgba(6, 182, 212, 0.5)",
                    "0 0 20px rgba(6, 182, 212, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted={isMuted}
              onEnded={handleVideoEnd}
            >
              <source src="/teaser-trailer.mp4" type="video/mp4" />
              
              {/* Fallback content */}
              <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="text-center space-y-6"
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-3xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <h1 className="relative text-5xl md:text-7xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      AVENIR
                    </h1>
                  </div>
                  <p className="text-xl text-gray-300 font-mono tracking-wider flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    THE FUTURE AWAITS
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </p>
                </motion.div>
              </div>
            </video>

            {/* Enhanced controls overlay */}
            <AnimatePresence>
              {showControls && !videoEnded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
                >
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={togglePlayPause}
                      className="relative text-white hover:text-cyan-400 transition-all duration-300 p-4 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 rounded-full transition-colors" />
                      {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                    </motion.button>
                    <motion.button
                      onClick={toggleMute}
                      className="relative text-white hover:text-cyan-400 transition-all duration-300 p-4 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 rounded-full transition-colors" />
                      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced end screen */}
            <AnimatePresence>
              {videoEnded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-black/95 via-cyan-950/40 to-black/95 backdrop-blur-xl flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-center space-y-8"
                  >
                    <div className="space-y-4">
                      <motion.div
                        animate={{ 
                          textShadow: [
                            "0 0 20px rgba(6, 182, 212, 0.5)",
                            "0 0 40px rgba(6, 182, 212, 0.8)",
                            "0 0 20px rgba(6, 182, 212, 0.5)",
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <h2 className="text-3xl font-mono text-cyan-400 tracking-wider">EXPERIENCE COMPLETE</h2>
                      </motion.div>
                      <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 text-gray-300">
                      <span className="text-sm font-mono">Entering AVENIR</span>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute -top-6 left-4 flex items-center gap-2 text-xs font-mono text-cyan-400"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
            <span>TRANSMISSION IN PROGRESS</span>
          </motion.div>
        </motion.div>

        {/* Enhanced CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="flex justify-center mt-8 gap-4"
        >
          <motion.button
            onClick={skipToMain}
            className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-all duration-300 rounded-xl backdrop-blur-xl font-mono tracking-wider text-base overflow-hidden shadow-lg shadow-cyan-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              <Sparkles className="w-5 h-5" />
              ENTER AVENIR
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </span>

            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-center mt-6"
        >
          <p className="text-xs text-gray-600 font-mono">Press SPACE to play/pause • ESC to skip</p>
        </motion.div>
      </div>
    </div>
  )
}