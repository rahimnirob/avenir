"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/shared/navbar"
import Sidebar from "@/components/shared/sidebar"
import Terminal from "@/components/shared/terminal"
import MainLayout from "@/components/shared/main-layout"
import { waitlistService, type JoinWaitlistData, type WaitlistResponse } from "@/lib/supabase/waitlist"

const GlassCard = ({ children, className = "", glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) => (
  <div className={`relative overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl ${glow ? "shadow-[0_0_50px_rgba(99,102,241,0.3)]" : "shadow-xl"} ${className}`}>
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">{children}</div>
  </div>
)

const ParticleField = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          initial={{ x: Math.random() * 1920, y: Math.random() * 1080 }}
          animate={{ x: Math.random() * 1920, y: Math.random() * 1080 }}
          transition={{ duration: Math.random() * 20 + 10, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  )
}

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [stage, setStage] = useState<"input" | "loading" | "success" | "error">("input")
  const [result, setResult] = useState<WaitlistResponse | null>(null)
  const [stats, setStats] = useState({ total: 0, todayCount: 0 })
  const [referralCode, setReferralCode] = useState<string>("")

  useEffect(() => {
    const loadStats = async () => {
      const data = await waitlistService.getWaitlistStats()
      setStats(data)
    }
    loadStats()

    const urlParams = new URLSearchParams(window.location.search)
    const ref = urlParams.get("ref")
    if (ref) setReferralCode(ref)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return

    setStage("loading")
    setIsSubmitting(true)

    try {
      const joinData: JoinWaitlistData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        referralCode: referralCode || undefined,
        utmSource: new URLSearchParams(window.location.search).get("utm_source") || undefined,
        utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || undefined,
      }

      const response = await waitlistService.joinWaitlist(joinData)
      setResult(response)

      if (response.success) {
        setStage("success")
        const newStats = await waitlistService.getWaitlistStats()
        setStats(newStats)
      } else {
        setStage("error")
      }
    } catch (error) {
      console.error("Signup error:", error)
      setResult({ success: false, error: "Something went wrong. Please try again." })
      setStage("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const resetForm = () => {
    setStage("input")
    setResult(null)
    setEmail("")
    setName("")
  }

  const shareOnTwitter = () => {
    const text = `I just claimed my Founder Code ${result?.founder_code} at AVENIR - where the future lives before reality. Join me: ${result?.referral_link}`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    const url = result?.referral_link || ""
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
  }

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <ParticleField />
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <Navbar />
      <MainLayout>
        <div className="max-w-2xl mx-auto p-6 md:p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
            <div className="text-center space-y-4 mb-12">
              <motion.h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                AVENIR
              </motion.h1>
              <motion.p className="text-xl text-gray-300 font-light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                Claim Your Founder Code — Join Avenir's Future Builders
              </motion.p>
              <motion.div className="text-sm text-cyan-400 font-mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                {stats.total} Founders Already Inside
                {stats.todayCount > 0 && <span className="text-gray-500 ml-2">(+{stats.todayCount} today)</span>}
              </motion.div>
              {referralCode && (
                <motion.div className="text-xs text-indigo-400 bg-indigo-500/10 rounded-full px-3 py-1 inline-block" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
                  Referred by: {referralCode}
                </motion.div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {stage === "input" && (
                <motion.div key="input" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                  <GlassCard className="p-8" glow>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/60 focus:bg-black/60 outline-none transition-all placeholder:text-gray-500" placeholder="Enter your name" required disabled={isSubmitting} />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/60 focus:bg-black/60 outline-none transition-all placeholder:text-gray-500" placeholder="Enter your email" required disabled={isSubmitting} />
                      </div>
                      <button type="submit" disabled={isSubmitting || !email || !name} className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold py-4 rounded-xl hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-50 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-2xl disabled:cursor-not-allowed">
                        {isSubmitting ? "JOINING..." : "JOIN WAITLIST"}
                      </button>
                    </form>
                  </GlassCard>
                </motion.div>
              )}

              {stage === "loading" && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <GlassCard className="p-8 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                      <div className="space-y-2">
                        <p className="text-cyan-400 font-mono">Establishing secure channel...</p>
                        <p className="text-gray-400 text-sm">Generating your founder code</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {stage === "success" && result?.success && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <GlassCard className="p-8" glow>
                    <div className="text-center space-y-6">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">Welcome to the Future</h2>
                        <p className="text-gray-300 text-sm">You are founder #{result.position}</p>
                      </motion.div>
                      <motion.div className="bg-black/40 rounded-xl p-6 border border-cyan-400/30" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Your Founder Code</p>
                        <div className="flex items-center justify-between">
                          <code className="text-2xl font-mono text-cyan-400 tracking-wider">{result.founder_code}</code>
                          <button onClick={() => copyToClipboard(result.founder_code!)} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs hover:bg-cyan-500/30 transition-colors">COPY</button>
                        </div>
                      </motion.div>
                      <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                        <div className="bg-indigo-500/10 rounded-xl p-4 border border-indigo-500/20">
                          <p className="text-xs text-gray-400 mb-2">REFERRAL LINK</p>
                          <div className="flex items-center gap-2">
                            <input type="text" value={result.referral_link} readOnly className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-2 text-xs text-gray-300" />
                            <button onClick={() => copyToClipboard(result.referral_link!)} className="px-3 py-2 bg-indigo-500/20 text-indigo-400 rounded text-xs hover:bg-indigo-500/30 transition-colors">COPY</button>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center">
                          <button onClick={shareOnTwitter} className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/30 transition-colors">Share on Twitter</button>
                          <button onClick={shareOnLinkedIn} className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded text-xs hover:bg-blue-600/30 transition-colors">Share on LinkedIn</button>
                        </div>
                        <p className="text-xs text-gray-500">Share your link, move up the list. Check your email for verification.</p>
                        <button onClick={resetForm} className="text-xs text-gray-400 hover:text-gray-300 transition-colors">Join another email →</button>
                      </motion.div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {stage === "error" && (
                <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <GlassCard className="p-8 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-red-400 rounded-full flex items-center justify-center">
                          <span className="text-red-400 text-xl">!</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-red-400 font-semibold">{result?.error?.includes("already registered") ? "Already Registered" : "Error"}</h3>
                        <p className="text-gray-400 text-sm">{result?.error || "Something went wrong. Please try again."}</p>
                        {result?.founder_code && (
                          <div className="mt-4 p-4 bg-black/40 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">Your existing code:</p>
                            <code className="text-cyan-400 font-mono">{result.founder_code}</code>
                          </div>
                        )}
                      </div>
                      <button onClick={resetForm} className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors text-sm">Try Again</button>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </MainLayout>
      <Sidebar />
      <Terminal />
    </>
  )
}