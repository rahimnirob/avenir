"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/shared/navbar"
import Sidebar from "@/components/shared/sidebar"
import Terminal from "@/components/shared/terminal"
import MainLayout from "@/components/shared/main-layout"
import Image from "next/image"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <MainLayout>
        <div className="relative">
          {/* Animated gradient background */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-4xl mx-auto p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Hero Section with Logos */}
              <div className="relative border border-cyan-400/30 rounded-xl bg-gradient-to-br from-cyan-950/40 via-black/60 to-purple-950/40 backdrop-blur-xl p-8 overflow-hidden shadow-2xl shadow-cyan-500/10">
                {/* Decorative grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                
                <div className="relative">
                  {/* Logos Row */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                    <div className="relative group">
                      {/* Aura effect for Avenir */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-2xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-500 opacity-60 group-hover:opacity-80"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 blur-xl rounded-full scale-125 animate-pulse"></div>
                      <Image 
                        src="/avenir-removebg-preview.png" 
                        alt="Avenir" 
                        width={120} 
                        height={40}
                        className="relative object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-sm font-mono">powered by</span>
                      <div className="relative group">
                        {/* Aura effect for REYM */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 blur-xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-500 opacity-60 group-hover:opacity-80"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-cyan-400/20 blur-lg rounded-full scale-125 animate-pulse"></div>
                        <Image 
                          src="/reym-removebg-preview.png" 
                          alt="REYM" 
                          width={80} 
                          height={30}
                          className="relative object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        />
                      </div>
                    </div>
                  </div>

                  <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl font-mono font-bold tracking-wider mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    The market doesn't reward effort.
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-300 text-lg mb-6 leading-relaxed max-w-3xl"
                  >
                    It rewards timing, clarity, and position. Avenir exists to observe the earliest signals of what's coming next — and decide what deserves to move forward.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-400/30 rounded-lg px-4 py-3"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-cyan-300 text-xs font-mono font-semibold">STATUS: OBSERVATION PHASE</p>
                      <p className="text-gray-400 text-xs mt-1">
                        Early observers receive priority access. Observation favors reach.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* What Avenir Actually Does */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="border border-white/10 rounded-xl bg-gradient-to-br from-purple-950/20 via-black/40 to-blue-950/20 backdrop-blur-xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
                  <h2 className="text-2xl font-mono tracking-wider text-cyan-400">WHAT.AVENIR.ACTUALLY.DOES</h2>
                </div>
                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  Avenir collects ideas before they're safe, places them in public view, and studies how they behave under attention.
                </p>
                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  Some gain traction. Some collapse. Patterns emerge. That intelligence becomes leverage.
                </p>
                <div className="bg-cyan-500/5 border-l-4 border-cyan-400 rounded-r-lg px-4 py-3">
                  <p className="text-cyan-300 text-base font-mono">
                    Founders don't come to Avenir to "launch". They come to understand whether their idea deserves to exist — and how to position it if it does.
                  </p>
                </div>
              </motion.div>

              {/* Core Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
                  <h2 className="text-2xl font-mono tracking-wider text-cyan-400">OBSERVATION.INFRASTRUCTURE</h2>
                </div>
                
                {/* Billboard / Market Board */}
                <div className="group border border-cyan-400/20 rounded-xl bg-gradient-to-br from-cyan-950/30 via-black/50 to-transparent backdrop-blur-xl p-6 hover:border-cyan-400/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl font-bold text-cyan-400/20 font-mono">01</span>
                    <h3 className="text-cyan-400 font-mono text-xl pt-2">The Public Market Board</h3>
                  </div>
                  <p className="text-gray-300 text-base mb-4 leading-relaxed pl-14">
                    The Market Board is a public exposure layer for early ideas. Limited slots. High visibility. No private pitching.
                  </p>
                  <div className="pl-14">
                    <p className="text-gray-300 text-base mb-3 leading-relaxed">Ideas placed here are:</p>
                    <ul className="space-y-2 text-gray-300 text-base mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>visible to the Avenir network</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>observed for traction and clarity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>part of Avenir's ongoing market analysis</span>
                      </li>
                    </ul>
                    <p className="text-gray-300 text-base leading-relaxed">
                      Early slots are intentionally limited. Once the observation window closes, placement becomes selective.
                    </p>
                  </div>
                </div>

                {/* The Pulse */}
                <div className="group border border-purple-400/20 rounded-xl bg-gradient-to-br from-purple-950/30 via-black/50 to-transparent backdrop-blur-xl p-6 hover:border-purple-400/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl font-bold text-purple-400/20 font-mono">02</span>
                    <h3 className="text-purple-400 font-mono text-xl pt-2">The Pulse</h3>
                  </div>
                  <p className="text-gray-300 text-base mb-4 leading-relaxed pl-14">
                    A live feed of submitted ideas, MVPs, and early products gaining attention. It does not show everything. It surfaces movement.
                  </p>
                  <p className="text-gray-300 text-base mb-4 leading-relaxed pl-14">
                    Builders use it to track emerging directions, study positioning, and understand what the market is responding to right now.
                  </p>
                  <div className="flex gap-3 pl-14">
                    <button className="bg-purple-500/10 border border-purple-400/30 text-purple-300 px-5 py-2.5 rounded-lg text-sm font-mono hover:bg-purple-500/20 transition-all duration-300">
                      Submit to the Pulse
                    </button>
                    <button className="bg-white/5 border border-white/20 text-gray-300 px-5 py-2.5 rounded-lg text-sm font-mono hover:bg-white/10 transition-all duration-300">
                      View Live Movement
                    </button>
                  </div>
                </div>

                {/* Avenir Picks */}
                <div className="group border border-blue-400/20 rounded-xl bg-gradient-to-br from-blue-950/30 via-black/50 to-transparent backdrop-blur-xl p-6 hover:border-blue-400/40 transition-all duration-300 shadow-lg hover:shadow-blue-500/10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl font-bold text-blue-400/20 font-mono">03</span>
                    <h3 className="text-blue-400 font-mono text-xl pt-2">Avenir Picks</h3>
                  </div>
                  <p className="text-gray-300 text-base mb-4 leading-relaxed pl-14">
                    At regular intervals, Avenir highlights a small number of submissions that demonstrate clarity of intent, strategic positioning, and early signal strength.
                  </p>
                  <div className="bg-blue-500/5 border-l-4 border-blue-400 rounded-r-lg px-4 py-3 ml-14">
                    <p className="text-blue-300 text-base font-mono">
                      Being selected is not a prize. It's a signal. Avenir Picks receive amplified visibility and deeper analysis — and become reference points for others studying the market.
                    </p>
                  </div>
                </div>

                {/* Marketspace */}
                <div className="group border border-emerald-400/20 rounded-xl bg-gradient-to-br from-emerald-950/30 via-black/50 to-transparent backdrop-blur-xl p-6 hover:border-emerald-400/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl font-bold text-emerald-400/20 font-mono">04</span>
                    <h3 className="text-emerald-400 font-mono text-xl pt-2">Marketspace</h3>
                  </div>
                  <p className="text-gray-300 text-base mb-4 leading-relaxed pl-14">
                    Markets don't always exist when ideas are born. Marketspace allows founders to open early access, collect demand, and build a niche audience before scaling.
                  </p>
                  <p className="text-emerald-300 text-base leading-relaxed pl-14 font-mono">
                    If a market isn't ready — Avenir helps you shape it.
                  </p>
                </div>

                {/* Terminal Mode */}
                <div className="group border border-amber-400/20 rounded-xl bg-gradient-to-br from-amber-950/30 via-black/50 to-transparent backdrop-blur-xl p-6 hover:border-amber-400/40 transition-all duration-300 shadow-lg hover:shadow-amber-500/10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl font-bold text-amber-400/20 font-mono">05</span>
                    <h3 className="text-amber-400 font-mono text-xl pt-2">Terminal Mode</h3>
                  </div>
                  <p className="text-gray-300 text-base mb-4 leading-relaxed pl-14">
                    For builders who prefer precision over polish. A stripped, direct interface for rapid submissions, bulk actions, and power-user workflows.
                  </p>
                  <p className="text-amber-300 text-base leading-relaxed pl-14 font-mono">
                    No noise. Only control.
                  </p>
                </div>
              </motion.div>

              {/* How Submissions Work */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="border border-white/10 rounded-xl bg-gradient-to-br from-indigo-950/20 via-black/40 to-purple-950/20 backdrop-blur-xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
                  <h2 className="text-2xl font-mono tracking-wider text-cyan-400">HOW.SUBMISSIONS.WORK</h2>
                </div>
                <div className="space-y-4">
                  {[
                    "Join the observation queue",
                    "Submit your idea or MVP (clear, early, honest)",
                    "Choose visibility level",
                    "Automated and editorial review",
                    "Public exposure or feedback loop",
                    "Ongoing observation and potential selection"
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                      <span className="text-cyan-400 font-mono text-lg font-bold min-w-[2rem]">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-gray-300 text-base pt-1">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm font-mono">
                    Not everything passes. That's the point.
                  </p>
                </div>
              </motion.div>

              {/* Why This Exists */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="border border-white/10 rounded-xl bg-gradient-to-br from-gray-900/40 via-black/40 to-transparent backdrop-blur-xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
                  <h2 className="text-2xl font-mono tracking-wider text-cyan-400">WHY.THIS.EXISTS</h2>
                </div>
                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  The future doesn't announce itself. It leaks through unfinished products, strange ideas, and early builders willing to be seen before they're ready.
                </p>
                <div className="bg-cyan-500/5 border-l-4 border-cyan-400 rounded-r-lg px-4 py-3">
                  <p className="text-cyan-300 text-base font-mono">
                    Avenir was built to watch those moments — and give the right people an advantage before everyone else notices.
                  </p>
                </div>
              </motion.div>

              {/* Waitlist Access */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="border border-cyan-400/30 rounded-xl bg-gradient-to-br from-cyan-950/40 via-black/60 to-purple-950/40 backdrop-blur-xl p-8 shadow-2xl shadow-cyan-500/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
                  <h2 className="text-2xl font-mono tracking-wider text-cyan-400">WAITLIST.ACCESS</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { title: "PRIORITY ACCESS", desc: "Early observers receive priority placement opportunities", color: "cyan" },
                    { title: "EARLY PRICING", desc: "Access observation-phase pricing before standard rates apply", color: "purple" },
                    { title: "REFERRAL PRIORITY", desc: "Referral priority increases access weight. Observation favors reach.", color: "blue" }
                  ].map((benefit, i) => (
                    <div key={i} className={`border border-${benefit.color}-400/20 rounded-lg bg-gradient-to-br from-${benefit.color}-500/10 to-transparent p-5 hover:border-${benefit.color}-400/40 transition-all duration-300`}>
                      <h3 className={`text-${benefit.color}-400 font-mono text-sm font-bold mb-2`}>{benefit.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
                
                <a href="/waitlist" className="block">
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-4 rounded-lg font-mono text-base font-bold hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50">
                    Join Observation Queue →
                  </button>
                </a>
              </motion.div>

              {/* About REYM & FAQ in 2-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* About REYM */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="border border-white/10 rounded-xl bg-gradient-to-br from-gray-900/40 via-black/40 to-transparent backdrop-blur-xl p-6 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative group">
                      {/* Aura effect for REYM in About section */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-cyan-500/40 blur-xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-500 opacity-70"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-cyan-400/30 blur-lg rounded-full scale-125 animate-pulse"></div>
                      <Image 
                        src="/reym-removebg-preview.png" 
                        alt="REYM" 
                        width={60} 
                        height={24}
                        className="relative object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                      />
                    </div>
                  </div>
                  <h2 className="text-xl font-mono tracking-wider mb-3 text-cyan-400">BUILT.BY.REYM</h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Avenir is developed by REYM, a strategic venture studio focused on building systems that operate ahead of markets.
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Avenir is not an experiment. It is infrastructure.
                  </p>
                  <a href="https://reym.tech" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold font-mono">
                    Learn more at reym.tech →
                  </a>
                </motion.div>

                {/* FAQ */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="border border-white/10 rounded-xl bg-gradient-to-br from-gray-900/40 via-black/40 to-transparent backdrop-blur-xl p-6 shadow-lg"
                >
                  <h2 className="text-xl font-mono tracking-wider mb-4 text-cyan-400">FREQUENT.QUESTIONS</h2>
                  <div className="space-y-4 text-sm">
                    <div className="bg-white/5 rounded-lg p-3">
                      <h3 className="text-cyan-300 font-mono text-xs font-bold mb-1">Q: When does access open?</h3>
                      <p className="text-gray-300 text-xs">A: Access opens in phases. Early observers are notified first.</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <h3 className="text-cyan-300 font-mono text-xs font-bold mb-1">Q: How do ideas get visibility?</h3>
                      <p className="text-gray-300 text-xs">A: Through public placement, traction, and signal clarity.</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <h3 className="text-cyan-300 font-mono text-xs font-bold mb-1">Q: Is placement guaranteed?</h3>
                      <p className="text-gray-300 text-xs">A: No. Exposure is intentional, not automatic.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </MainLayout>
      <Sidebar />
      <Terminal />
    </>
  )
}