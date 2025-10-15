"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Intro() {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Enhanced background layers */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />

        {/* Animated grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            animate={{
              y: [Math.random() * windowSize.height, -100],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Flickering scanlines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Enhanced LIVE indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                opacity: [1, 0.3, 1],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)]"
            />
            <motion.div
              animate={{ 
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-red-500 rounded-full"
            />
          </div>
          <span className="text-red-500 font-mono text-base font-bold tracking-wider">LIVE</span>
          <div className="w-px h-4 bg-gray-500" />
          <span className="text-cyan-400 font-mono text-base tracking-wider">AVENIR BILLBOARD</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-cyan-400/50 rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Main headline with enhanced animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
        >
          <motion.span 
            className="inline-block bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% auto",
            }}
          >
            Welcome to the
            <br />
            Avenir Billboard
          </motion.span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-8 text-white"
        >
          Where Founders Go{" "}
          <motion.span 
            className="text-red-500 relative inline-block"
            animate={{
              textShadow: [
                "0 0 10px rgba(239, 68, 68, 0.5)",
                "0 0 20px rgba(239, 68, 68, 0.8)",
                "0 0 10px rgba(239, 68, 68, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            LIVE
            <motion.span
              className="absolute -inset-1 bg-red-500/20 blur-xl -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.span>
        </motion.h2>

        {/* Enhanced subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Every request. Every startup. Broadcasting in{" "}
          <span className="text-cyan-400 font-semibold relative">
            real-time
            <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </span>
          , like a digital TV channel.
        </motion.p>

        {/* Enhanced TV Frame mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* TV frame border with enhanced styling */}
          <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-10 border-4 border-gray-700 shadow-2xl">
            {/* Enhanced screen glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-indigo-500/30 to-purple-500/30 rounded-3xl blur-3xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-500/50" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-500/50" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-500/50" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-500/50" />

            {/* Inner screen with enhanced effects */}
            <div className="relative bg-black/90 rounded-2xl p-16 border border-cyan-500/40 backdrop-blur-xl overflow-hidden">
              {/* Animated static effect */}
              <div className="absolute inset-0 opacity-5">
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
                    backgroundSize: "100% 4px",
                  }}
                />
              </div>

              {/* Scan line effect */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                animate={{
                  y: [0, 400],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Enhanced screen content placeholder */}
              <div className="relative text-center space-y-6">
                <motion.div 
                  className="text-cyan-400 font-mono text-sm tracking-wider"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  [ BROADCASTING LIVE ]
                </motion.div>
                
                <motion.div 
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% auto",
                  }}
                >
                  Your Startup Could Be Here
                </motion.div>
                
                <div className="text-gray-400 text-base">Join the live feed and get discovered</div>
                
                {/* Animated progress bar */}
                <div className="max-w-md mx-auto mt-8">
                  <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 h-2"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced TV control buttons */}
            <div className="absolute bottom-6 right-6 flex gap-3">
              <motion.div 
                className="w-4 h-4 bg-red-500/70 rounded-full shadow-lg"
                animate={{
                  boxShadow: ["0 0 5px rgba(239, 68, 68, 0.5)", "0 0 15px rgba(239, 68, 68, 0.8)", "0 0 5px rgba(239, 68, 68, 0.5)"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <div className="w-4 h-4 bg-yellow-500/70 rounded-full shadow-lg" />
              <div className="w-4 h-4 bg-green-500/70 rounded-full shadow-lg" />
            </div>

            {/* Brand label */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-gray-500 tracking-wider">AVENIR.TV</span>
            </div>
          </div>

          {/* Enhanced glow effect under TV */}
          <motion.div
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-cyan-500/40 via-indigo-500/40 to-purple-500/40 blur-3xl rounded-full"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Additional info bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500 font-mono"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            <span>24/7 Broadcasting</span>
          </div>
          <div className="w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            <span>Real-Time Updates</span>
          </div>
          <div className="w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
            <span>Priority Slots Available</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}