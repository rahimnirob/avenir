"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { Zap, ArrowUp, Sparkles } from "lucide-react"

export default function CTA() {
  const router = useRouter()
  const [priorityCount, setPriorityCount] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    // Set window size on client
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })

    fetchPriorityCount()

    const channel = supabase
      .channel("cta_priority_updates")
      .on("postgres_changes", { event: "*", schema: "public", table: "billboard_submissions" }, () => {
        fetchPriorityCount()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchPriorityCount = async () => {
    const { count, error } = await supabase
      .from("billboard_submissions")
      .select("*", { count: "exact", head: true })
      .eq("priority", true)

    if (!error && count !== null) {
      setPriorityCount(count)
    }
  }

  const slotsRemaining = Math.max(0, 50 - priorityCount)
  const urgencyLevel = slotsRemaining <= 10 ? "high" : slotsRemaining <= 25 ? "medium" : "low"

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            animate={{
              y: [Math.random() * windowSize.height, -100],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-10"
        >
          {/* Enhanced spotlight icon */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50">
              <Zap className="w-12 h-12 text-white" fill="white" />
            </div>
          </motion.div>

          {/* Enhanced headline */}
          <div className="space-y-4">
            <motion.h2 
              className="text-5xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
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
                Claim Your Spotlight
              </motion.span>
              <br />
              <span className="text-white">Before It's Too Late</span>
            </motion.h2>

            {/* Urgency badge */}
            {slotsRemaining > 0 && urgencyLevel !== "low" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/40 rounded-full px-5 py-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </motion.div>
                <span className="text-amber-400 font-mono text-sm font-bold">
                  {urgencyLevel === "high" ? "⚡ ONLY FEW SLOTS LEFT!" : "🔥 FILLING FAST"}
                </span>
              </motion.div>
            )}
          </div>

          {/* Enhanced description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {slotsRemaining > 0 ? (
              <>
                Only{" "}
                <motion.span
                  className="text-cyan-400 font-bold relative inline-block"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(34, 211, 238, 0.5)",
                      "0 0 20px rgba(34, 211, 238, 0.8)",
                      "0 0 10px rgba(34, 211, 238, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {slotsRemaining} priority slots
                  <motion.span
                    className="absolute -inset-1 bg-cyan-400/20 blur-lg -z-10"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.span>{" "}
                left for week 1 broadcasting. Early founders get maximum visibility when we launch.
              </>
            ) : (
              <>
                All priority slots claimed! Join the waitlist to be notified when premium packages launch and secure
                your spot in the regular broadcast queue.
              </>
            )}
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/waitlist")}
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold rounded-xl shadow-2xl hover:shadow-cyan-500/50 transition-all text-lg overflow-hidden"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Join Waitlist
              </span>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              }}
              className="group relative px-10 py-5 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-xl hover:bg-white/15 hover:border-cyan-400/40 transition-all text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ArrowUp className="w-5 h-5" />
                Submit Your Startup
              </span>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>

          {/* Enhanced stats grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { label: "Priority Slots Claimed", value: `${priorityCount}/50`, color: "cyan" },
              { 
                label: "Slots Remaining", 
                value: slotsRemaining > 0 ? slotsRemaining : "FULL",
                color: slotsRemaining === 0 ? "red" : urgencyLevel === "high" ? "amber" : "purple"
              },
              { label: "Days Until Launch", value: "30", color: "indigo" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="relative group"
              >
                {/* Card background */}
                <div className={`bg-gradient-to-br from-${stat.color}-950/30 via-black/60 to-black/80 border border-${stat.color}-500/20 rounded-xl p-6 backdrop-blur-xl hover:border-${stat.color}-500/40 transition-all duration-300`}>
                  <div className={`absolute inset-0 bg-${stat.color}-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="relative text-center space-y-2">
                    <motion.div
                      className={`text-4xl md:text-5xl font-bold text-${stat.color}-400`}
                      animate={
                        stat.label === "Slots Remaining" && slotsRemaining > 0 && slotsRemaining <= 10
                          ? {
                              scale: [1, 1.1, 1],
                              textShadow: [
                                "0 0 10px rgba(34, 211, 238, 0.5)",
                                "0 0 20px rgba(34, 211, 238, 0.8)",
                                "0 0 10px rgba(34, 211, 238, 0.5)",
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-mono">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced bottom decoration */}
          <div className="pt-12">
            <div className="flex items-center justify-center gap-3">
              <motion.div
                className={`w-2 h-2 rounded-full ${slotsRemaining > 0 ? 'bg-cyan-400' : 'bg-red-400'}`}
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">
                {slotsRemaining > 0 ? "Limited Priority Access Available" : "Priority Slots Fully Booked"}
              </p>
              <motion.div
                className={`w-2 h-2 rounded-full ${slotsRemaining > 0 ? 'bg-cyan-400' : 'bg-red-400'}`}
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
              />
            </div>

            {/* Additional urgency message */}
            {slotsRemaining > 0 && urgencyLevel === "high" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-6 py-3"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  ⚡
                </motion.div>
                <span className="text-amber-400 text-sm font-mono">
                  Slots filling in real-time • Don't miss out
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}