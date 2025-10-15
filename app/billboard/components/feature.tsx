"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase/client"

interface BillboardSubmission {
  id: string
  founder_name: string
  startup_name: string
  mvp_name: string
  tagline: string
  details: string
  category: string | null
  priority: boolean
  created_at: string
}

const CATEGORIES = [
  "AI/ML",
  "SaaS",
  "Security",
  "DevTools",
  "Design",
  "FinTech",
  "HealthTech",
  "EdTech",
  "E-commerce",
  "Other",
]

export default function Feature() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submissions, setSubmissions] = useState<BillboardSubmission[]>([])
  const [priorityCount, setPriorityCount] = useState(0)
  const [formData, setFormData] = useState({
    founder_name: "",
    startup_name: "",
    mvp_name: "",
    tagline: "",
    details: "",
    category: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isPriority, setIsPriority] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSubmissions()
    fetchPriorityCount()

    // Subscribe to real-time updates
    const channel = supabase
      .channel("billboard_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "billboard_submissions" }, () => {
        fetchSubmissions()
        fetchPriorityCount()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("billboard_submissions")
      .select("*")
      .eq("priority", true)
      .order("created_at", { ascending: false })
      .limit(20)

    if (error) {
      console.error("[v0] Error fetching submissions:", error)
      return
    }

    if (data && data.length > 0) {
      setSubmissions(data)
    }
  }

  const fetchPriorityCount = async () => {
    const { count, error } = await supabase
      .from("billboard_submissions")
      .select("*", { count: "exact", head: true })
      .eq("priority", true)

    if (error) {
      console.error("[v0] Error fetching priority count:", error)
      return
    }

    setPriorityCount(count || 0)
  }

  // Rotate submissions every 5 seconds
  useEffect(() => {
    if (submissions.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % submissions.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [submissions.length])

  const currentSubmission = submissions[currentIndex]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !formData.founder_name ||
      !formData.startup_name ||
      !formData.mvp_name ||
      !formData.tagline ||
      !formData.details
    ) {
      setError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const { data, error } = await supabase.from("billboard_submissions").insert([formData]).select().single()

      if (error) throw error

      // Check if submission got priority status
      const gotPriority = data?.priority || false
      setIsPriority(gotPriority)
      setSubmitSuccess(true)
      setFormData({
        founder_name: "",
        startup_name: "",
        mvp_name: "",
        tagline: "",
        details: "",
        category: "",
      })

      // Reset success message after 3 seconds, then refresh
      setTimeout(() => {
        setSubmitSuccess(false)
        setIsPriority(false)
        // Refresh the page to show updated billboard
        window.location.reload()
      }, 3000)
    } catch (error: any) {
      console.error("[v0] Submission error:", error)
      setError(error.message || "Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const slotsRemaining = Math.max(0, 50 - priorityCount)
  const progressPercentage = Math.min(100, (priorityCount / 50) * 100)

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-indigo-400 
                         bg-clip-text text-transparent"
          >
            The Billboard in Action
          </h2>
          <p className="text-gray-400 text-lg">Watch startups broadcast live, every 5 seconds</p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 max-w-md mx-auto">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Founders Spotlight</span>
                <span className="text-sm font-bold text-cyan-400">
                  {priorityCount}/50 <span className="text-gray-500">claimed</span>
                </span>
              </div>
              <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-cyan-400 to-indigo-400 h-2"
                />
              </div>
              {slotsRemaining > 0 ? (
                <p className="text-xs text-gray-400 mt-2 text-center">
                  🔥 Only <span className="text-cyan-400 font-semibold">{slotsRemaining} slots</span> left for week 1
                  priority!
                </p>
              ) : (
                <p className="text-xs text-amber-400 mt-2 text-center">
                  ⚡ All priority slots claimed! You'll be in the regular queue.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billboard Feed - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main billboard card */}
            <div
              className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 
                            rounded-2xl p-8 border border-white/10 overflow-hidden min-h-[400px]
                            flex items-center justify-center"
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-purple-500/10 
                              blur-3xl"
              />

              {/* Rotating content */}
              {currentSubmission ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSubmission.id}
                    initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center space-y-6 max-w-2xl"
                  >
                    <div className="flex items-center justify-center gap-2">
                      {currentSubmission.priority && (
                        <div
                          className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 
                                      border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold
                                      flex items-center gap-1"
                        >
                          <span>🌟</span>
                          <span>Founders Spotlight</span>
                        </div>
                      )}
                      {currentSubmission.category && (
                        <div
                          className="px-4 py-1 bg-cyan-500/20 border border-cyan-500/30 
                                      rounded-full text-cyan-400 text-xs font-mono"
                        >
                          {currentSubmission.category}
                        </div>
                      )}
                    </div>

                    {/* Startup name */}
                    <h3
                      className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white 
                                 bg-clip-text text-transparent"
                    >
                      {currentSubmission.startup_name}
                    </h3>

                    {/* MVP name */}
                    <p className="text-lg text-indigo-400 font-semibold">{currentSubmission.mvp_name}</p>

                    {/* Tagline */}
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">{currentSubmission.tagline}</p>

                    {/* Founder name */}
                    <p className="text-sm text-gray-500">
                      by <span className="text-gray-400 font-medium">{currentSubmission.founder_name}</span>
                    </p>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-2 pt-8">
                      {submissions.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === currentIndex ? "bg-cyan-400 w-8" : "bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto" />
                  <p className="text-gray-400">Loading live broadcasts...</p>
                  <p className="text-sm text-gray-500">Be the first to submit your startup!</p>
                </div>
              )}

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-500/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-500/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-500/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-500/50" />
            </div>

            {/* Ticker bar */}
            <div
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 
                            overflow-hidden relative"
            >
              <motion.div
                animate={{ x: [0, -100] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="flex items-center gap-8 whitespace-nowrap"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-gray-400 font-mono text-sm">NOW BROADCASTING:</span>
                  <span className="text-cyan-400 font-semibold">{currentSubmission?.startup_name || "Loading..."}</span>
                </div>
                {submissions.map((submission) => (
                  <div key={submission.id} className="flex items-center gap-3">
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-500 text-sm">{submission.startup_name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-24 bg-white/[0.02] backdrop-blur-xl border border-white/10 
                         rounded-2xl p-6 space-y-6"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-white">Broadcast Your Idea</h3>
                <p className="text-gray-400 text-sm">Join the live feed and get discovered</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Founder Name */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                    Founder Name *
                  </label>
                  <input
                    type="text"
                    value={formData.founder_name}
                    onChange={(e) => setFormData({ ...formData, founder_name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm 
                             focus:border-cyan-400/60 focus:bg-black/60 outline-none transition-all
                             placeholder:text-gray-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Startup Name */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                    Startup Name *
                  </label>
                  <input
                    type="text"
                    value={formData.startup_name}
                    onChange={(e) => setFormData({ ...formData, startup_name: e.target.value })}
                    placeholder="Your startup name"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm 
                             focus:border-cyan-400/60 focus:bg-black/60 outline-none transition-all
                             placeholder:text-gray-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* MVP Name */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                    MVP Name *
                  </label>
                  <input
                    type="text"
                    value={formData.mvp_name}
                    onChange={(e) => setFormData({ ...formData, mvp_name: e.target.value })}
                    placeholder="Your product name"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm 
                             focus:border-cyan-400/60 focus:bg-black/60 outline-none transition-all
                             placeholder:text-gray-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                    Tagline *
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="One-line description"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm 
                             focus:border-cyan-400/60 focus:bg-black/60 outline-none transition-all
                             placeholder:text-gray-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* MVP Details */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                    MVP Details *
                  </label>
                  <textarea
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Tell us more about your MVP..."
                    rows={3}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm 
                             focus:border-cyan-400/60 focus:bg-black/60 outline-none transition-all
                             placeholder:text-gray-500 resize-none"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                    Category (Optional)
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm 
                             focus:border-cyan-400/60 focus:bg-black/60 outline-none transition-all
                             text-gray-300"
                    disabled={isSubmitting}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-center">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold 
                           py-3 rounded-xl hover:from-cyan-600 hover:to-indigo-600 disabled:opacity-50 
                           transition-all transform hover:scale-[1.02] active:scale-[0.98]
                           shadow-lg hover:shadow-2xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Broadcasting...
                    </>
                  ) : (
                    <>🚀 Broadcast My Idea</>
                  )}
                </button>
              </form>

              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`${
                      isPriority
                        ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30"
                        : "bg-green-500/20 border-green-500/30"
                    } border rounded-xl p-4 text-center`}
                  >
                    {isPriority ? (
                      <>
                        <p className="text-amber-400 text-sm font-bold mb-1">🌟 Founders Spotlight Secured!</p>
                        <p className="text-amber-300 text-xs">
                          You've claimed a week 1 priority slot. You'll be featured prominently!
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-green-400 text-sm font-semibold mb-1">✓ Submission Received!</p>
                        <p className="text-green-300 text-xs">
                          You'll be broadcast after priority founders. Stay tuned!
                        </p>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Info box */}
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                <p className="text-xs text-gray-400 leading-relaxed">
                  <span className="text-indigo-400 font-semibold">Coming Soon:</span> Premium spotlight packages to
                  feature your startup for extended periods.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}