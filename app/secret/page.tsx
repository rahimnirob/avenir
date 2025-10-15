"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/shared/navbar"
import Sidebar from "@/components/shared/sidebar"
import Terminal from "@/components/shared/terminal"
import MainLayout from "@/components/shared/main-layout"

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic'

const GlitchText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={`relative ${className}`}
    animate={{
      textShadow: [
        "0 0 0px rgba(99, 102, 241, 0)",
        "3px 3px 8px rgba(99, 102, 241, 0.7), -3px -3px 8px rgba(34, 211, 238, 0.7)",
        "0 0 0px rgba(99, 102, 241, 0)",
      ],
    }}
    transition={{
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 5,
    }}
  >
    {children}
  </motion.div>
)

const BlinkingCursor = () => (
  <motion.span
    className="inline-block w-2 h-5 bg-cyan-400 ml-1 shadow-lg shadow-cyan-400/50"
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
  />
)

const MovingGrid = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }}
      animate={{
        x: [0, 50],
        y: [0, 50],
      }}
      transition={{
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  </div>
)

const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default function SecretPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 -z-10">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            delay: 7.5,
          }}
        />

        {/* Moving grid */}
        <MovingGrid />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Scan lines */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />
      </div>

      <Navbar />
      <div className="flex">
        <MainLayout>
          <div className="max-w-3xl mx-auto px-8 py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-12"
            >
              {/* Enhanced Chapter Header */}
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-xl" />
                  <GlitchText className="relative text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    Transmission Intercepted
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  </GlitchText>
                  <h1 className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                    Chapter 1: The World Before
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-3 text-gray-500 text-xs font-mono bg-black/40 border border-cyan-500/20 rounded-full px-6 py-2 backdrop-blur-xl"
                >
                  <span className="text-red-400">CLASSIFIED</span>
                  <span>•</span>
                  <span className="text-amber-400">EYES ONLY</span>
                  <BlinkingCursor />
                </motion.div>
              </div>

              {/* Enhanced Story Content */}
              <div className="space-y-8 text-gray-300 leading-relaxed">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="relative group"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative border-l-2 border-cyan-400/50 pl-6 py-2">
                    <p className="text-lg text-gray-200">
                      They called it <span className="text-cyan-400 font-semibold relative">
                        progress
                        <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                      </span>. The world moved faster, louder, brighter. Everyone chased the next thing, the next trend, the next viral moment.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  className="relative bg-gradient-to-r from-black/40 via-indigo-950/20 to-black/40 border border-indigo-500/20 rounded-xl p-6 backdrop-blur-sm group hover:border-indigo-500/40 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="relative">
                    But beneath the noise, something else was happening. Patterns emerged. Signals in the chaos.{" "}
                    <span className="text-indigo-400 font-semibold relative">
                      Unseen forces
                      <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
                    </span> began to shape the future before it arrived.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="relative"
                >
                  <p className="text-gray-300">
                    Most people didn't notice. They were too busy building, hustling, grinding. But there was one who watched. A quiet observer who saw what others missed.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                  className="relative overflow-hidden bg-gradient-to-br from-cyan-950/40 via-black/80 to-purple-950/40 border border-cyan-400/30 rounded-2xl p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/10"
                >
                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-cyan-400/20 rounded-2xl blur-xl opacity-50" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <p className="text-cyan-300 italic text-lg leading-relaxed">
                      They called him <span className="text-cyan-400 font-bold not-italic text-2xl relative">
                        Lil Boy
                        <span className="absolute -inset-1 bg-cyan-400/20 blur-lg -z-10" />
                      </span>. Not because he was small, but because he saw the world with fresh eyes. Uncorrupted. Unfiltered.
                    </p>
                  </div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400/50" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-cyan-400/50" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-cyan-400/50" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400/50" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6, duration: 0.8 }}
                  className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-500"
                >
                  <p>
                    He noticed the patterns first. The way certain ideas spread like wildfire while others died in silence. The way some founders seemed to know what was coming before anyone else. The way the future whispered its secrets to those who knew how to listen.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3, duration: 0.8 }}
                  className="relative group"
                >
                  <div className="absolute -inset-4 bg-gradient-to-l from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative border-r-2 border-indigo-400/50 pr-6 py-2 text-right">
                    <p className="text-xl text-gray-200">
                      And then, one day, he found it. A place where the future lived before reality. A place called{" "}
                      <span className="relative inline-block">
                        <span className="text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-clip-text font-bold text-3xl">
                          AVENIR
                        </span>
                        <span className="absolute -inset-2 bg-gradient-to-r from-indigo-400/20 via-cyan-400/20 to-indigo-400/20 blur-xl -z-10 animate-pulse" />
                      </span>
                      .
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Animated Glyph */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.4, duration: 0.8 }}
                className="flex justify-center py-12"
              >
                <div className="relative">
                  {/* Outer glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl rounded-full scale-150" />
                  
                  <motion.div
                    className="relative w-24 h-24"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <div className="absolute inset-0 border-2 border-cyan-400/40 rounded-full" />
                    <div className="absolute inset-3 border-2 border-indigo-400/40 rounded-full" />
                    <div className="absolute inset-6 border-2 border-purple-400/40 rounded-full" />
                    
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.8, duration: 0.8 }}
                className="text-center space-y-8 pt-12 border-t border-cyan-500/20"
              >
                <div className="space-y-3">
                  <p className="text-gray-400 text-base">This is only the beginning.</p>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-cyan-400/20 rounded-full px-4 py-2">
                    <span className="text-xs text-gray-500 font-mono">Chapter 2: The Discovery</span>
                    <span className="text-cyan-400">•</span>
                    <span className="text-xs text-cyan-400 font-mono">Coming Soon</span>
                  </div>
                </div>

                <motion.button
                  className="group relative px-10 py-4 bg-gradient-to-r from-indigo-500/20 via-cyan-500/20 to-purple-500/20
                           border border-cyan-400/40 rounded-xl text-cyan-400 font-mono text-base font-semibold
                           hover:border-cyan-400/70 transition-all duration-300 overflow-hidden shadow-lg shadow-cyan-500/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    CONTINUE THE JOURNEY
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-cyan-500/30 to-purple-500/0 rounded-xl"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </motion.button>

                <div className="inline-flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span>Share this chapter to unlock exclusive insights</span>
                  <div className="w-1 h-1 bg-gray-600 rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </MainLayout>
        <Sidebar />
      </div>
      <Terminal />
    </div>
  )
}