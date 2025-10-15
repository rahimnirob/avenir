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
                    Own tomorrow. Launch today.
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-300 text-lg mb-6 leading-relaxed max-w-3xl"
                  >
                    Avenir is the go-to platform for founders who don't wait for the future — they build it. 
                    Submit your MVP, secure a spotlight, and scale into the markets of tomorrow.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-400/30 rounded-lg px-4 py-3"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-cyan-300 text-xs font-mono font-semibold">STATUS: PLATFORM IN DEVELOPMENT</p>
                      <p className="text-gray-400 text-xs mt-1">
                        Waitlisted users will be notified at launch — join now to secure founder perks.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Vision Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="border border-white/10 rounded-xl bg-gradient-to-br from-purple-950/20 via-black/40 to-blue-950/20 backdrop-blur-xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
                  <h2 className="text-2xl font-mono tracking-wider text-cyan-400">VISION</h2>
                </div>
                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  Avenir is a futuristic ecosystem for founders, creators, and teams who want to launch ideas, 
                  MVPs or startups and secure a strategic spot in future markets. Think of Avenir as a summit, 
                  marketplace, launchpad, and public stage rolled into one — designed to accelerate winning ideas, 
                  create new markets, and help founders grab their share of tomorrow's economies.
                </p>
                <div className="bg-cyan-500/5 border-l-4 border-cyan-400 rounded-r-lg px-4 py-3">
                  <p className="text-cyan-300 text-base font-mono">
                    Our mission: make the future arrive faster — by finding, amplifying, and helping dominant 
                    founders ship early, iterate fast, and own their niche.
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
                  <h2 className="text-2xl font-mono tracking-wider text-cyan-400">CORE.FEATURES</h2>
                </div>
                
                {/* Billboard */}
                <div className="group border border-cyan-400/20 rounded-xl bg-gradient-to-br from-cyan-950/30 via-black/50 to-transparent backdrop-blur-xl p-6 hover:border-cyan-400/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl font-bold text-cyan-400/20 font-mono">01</span>
                    <h3 className="text-cyan-400 font-mono text-xl pt-2">Billboard — Prime Spotlight for Early Domination</h3>
                  </div>
                  <p className="text-gray-300 text-base mb-6 leading-relaxed pl-14">
                    A high-impact promotional slot on Avenir's landing and Marketspace. Billboards are curated, 
                    paid placements that guarantee visibility to investors, early adopters, and the Avenir community.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pl-14">
                    <div className="relative border border-cyan-400/30 rounded-lg bg-cyan-500/5 p-5 overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl"></div>
                      <div className="relative">
                        <h4 className="text-cyan-300 font-mono text-sm font-bold mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                          PRE-ORDER PRICING (FOUNDERS ONLY)
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center bg-black/20 rounded p-2">
                            <span className="text-gray-300">1 Day Billboard</span>
                            <span className="text-cyan-400 font-bold text-lg">$20</span>
                          </div>
                          <div className="flex justify-between items-center bg-black/20 rounded p-2">
                            <span className="text-gray-300">1 Week Billboard</span>
                            <span className="text-cyan-400 font-bold text-lg">$100</span>
                          </div>
                          <div className="flex justify-between items-center bg-black/20 rounded p-2">
                            <span className="text-gray-300">1 Month Billboard</span>
                            <span className="text-cyan-400 font-bold text-lg">$300</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-white/10 rounded-lg bg-white/5 p-5">
                      <h4 className="text-gray-400 font-mono text-sm font-bold mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                        OFFICIAL PRICING
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center bg-black/20 rounded p-2">
                          <span className="text-gray-400">1 Day Billboard</span>
                          <span className="text-gray-400 font-bold text-lg">$99</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/20 rounded p-2">
                          <span className="text-gray-400">1 Week Billboard</span>
                          <span className="text-gray-400 font-bold text-lg">$299</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/20 rounded p-2">
                          <span className="text-gray-400">1 Month Billboard</span>
                          <span className="text-gray-400 font-bold text-lg">$999</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pl-14">
                    <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-black px-6 py-3 rounded-lg text-sm font-mono font-bold hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
                      Pre-order Billboard Slot →
                    </button>
                  </div>
                </div>

                {/* The Pulse */}
                <div className="group border border-purple-400/20 rounded-xl bg-gradient-to-br from-purple-950/30 via-black/50 to-transparent backdrop-blur-xl p-6 hover:border-purple-400/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl font-bold text-purple-400/20 font-mono">02</span>
                    <h3 className="text-purple-400 font-mono text-xl pt-2">The Pulse — The Feed That Surfaces Momentum</h3>
                  </div>
                  <p className="text-gray-300 text-base mb-4 leading-relaxed pl-14">
                    A dynamic feed of vetted submissions — ideas, MVPs, and trending projects. The Pulse shows 
                    what's gaining traction and what the Avenir community is watching.
                  </p>
                  <div className="flex gap-3 pl-14">
                    <button className="bg-purple-500/10 border border-purple-400/30 text-purple-300 px-5 py-2.5 rounded-lg text-sm font-mono hover:bg-purple-500/20 transition-all duration-300">
                      Submit to the Pulse
                    </button>
                    <button className="bg-white/5 border border-white/20 text-gray-300 px-5 py-2.5 rounded-lg text-sm font-mono hover:bg-white/10 transition-all duration-300">
                      See Live Projects
                    </button>
                  </div>
                </div>

                {/* Avenir Picks */}
                <div className="group border border-blue-400/20 rounded-xl bg-gradient-to-br from-blue-950/30 via-black/50 to-transparent backdrop-blur-xl p-6 hover:border-blue-400/40 transition-all duration-300 shadow-lg hover:shadow-blue-500/10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl font-bold text-blue-400/20 font-mono">03</span>
                    <h3 className="text-blue-400 font-mono text-xl pt-2">Avenir Picks — Monthly/Weekly Curation & Campaigns</h3>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed pl-14">
                    A curated selection of the best submissions — winners get promotion, tailored growth campaigns, 
                    and access to partner benefits. Avenir Picks becomes a badge of excellence — 'enter once, dominate forever.'
                  </p>
                </div>

                {/* Marketspace */}
                <div className="group border border-emerald-400/20 rounded-xl bg-gradient-to-br from-emerald-950/30 via-black/50 to-transparent backdrop-blur-xl p-6 hover:border-emerald-400/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl font-bold text-emerald-400/20 font-mono">04</span>
                    <h3 className="text-emerald-400 font-mono text-xl pt-2">Marketspace — Create & Own Your Market</h3>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed pl-14">
                    A customizable marketplace where founders can list their MVPs, open early signups, sell pre-orders, 
                    and build a niche market around their product. If markets don't exist — create them.
                  </p>
                </div>

                {/* Terminal Mode */}
                <div className="group border border-amber-400/20 rounded-xl bg-gradient-to-br from-amber-950/30 via-black/50 to-transparent backdrop-blur-xl p-6 hover:border-amber-400/40 transition-all duration-300 shadow-lg hover:shadow-amber-500/10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl font-bold text-amber-400/20 font-mono">05</span>
                    <h3 className="text-amber-400 font-mono text-xl pt-2">Raw / Terminal Mode — For Builders & Power Users</h3>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed pl-14">
                    A terminal-style navigation and power interface for builders who love direct control. 
                    CLI-like quick actions, bulk uploads, and developer-first exports for rapid iteration and automation.
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
                    "Sign up (or join waitlist) → get a founder code",
                    "Create submission: Title, short pitch (30–60s), 3 images/screenshots, tags, early metric",
                    "Choose visibility: Pulse only / Marketspace listing / Billboard pre-order",
                    "Review: Automated checks → Human editorial review",
                    "Outcome: Live in Pulse / Feedback & revision request / Marketspace listing scheduled",
                    "Growth: If selected for Avenir Picks, receive campaign + billboard slot + newsletter highlight"
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                      <span className="text-cyan-400 font-mono text-lg font-bold min-w-[2rem]">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-gray-300 text-base pt-1">{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Waitlist Benefits */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="border border-cyan-400/30 rounded-xl bg-gradient-to-br from-cyan-950/40 via-black/60 to-purple-950/40 backdrop-blur-xl p-8 shadow-2xl shadow-cyan-500/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
                  <h2 className="text-2xl font-mono tracking-wider text-cyan-400">WAITLIST.BENEFITS</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { title: "EARLY ACCESS", desc: "Founder pricing and limited billboard slots", color: "cyan" },
                    { title: "FOUNDER CODE", desc: "Unique ID for referrals, tracking, and special vault access", color: "purple" },
                    { title: "REFERRAL REWARDS", desc: "Milestone rewards: 10, 50, 200 invites unlock special perks", color: "blue" }
                  ].map((benefit, i) => (
                    <div key={i} className={`border border-${benefit.color}-400/20 rounded-lg bg-gradient-to-br from-${benefit.color}-500/10 to-transparent p-5 hover:border-${benefit.color}-400/40 transition-all duration-300`}>
                      <h3 className={`text-${benefit.color}-400 font-mono text-sm font-bold mb-2`}>{benefit.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
                
                <a href="/waitlist" className="block">
                <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-4 rounded-lg font-mono text-base font-bold hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50">
                  Join Waitlist — Get Founder Code →
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
                  <h2 className="text-xl font-mono tracking-wider mb-3 text-cyan-400">ABOUT.REYM</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    REYM is a strategic builder of future-focused platforms and ventures. Avenir is a product of 
                    REYM's mission to discover and accelerate founders who will shape tomorrow. 
                    <a href="https://reym.tech" className="text-cyan-400 hover:text-cyan-300 underline ml-1 font-semibold">
                      Learn more at reym.tech →
                    </a>
                  </p>
                </motion.div>

                {/* FAQ */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="border border-white/10 rounded-xl bg-gradient-to-br from-gray-900/40 via-black/40 to-transparent backdrop-blur-xl p-6 shadow-lg"
                >
                  <h2 className="text-xl font-mono tracking-wider mb-4 text-cyan-400">FAQ</h2>
                  <div className="space-y-4 text-sm">
                    <div className="bg-white/5 rounded-lg p-3">
                      <h3 className="text-cyan-300 font-mono text-xs font-bold mb-1">Q: When will Avenir be live?</h3>
                      <p className="text-gray-300 text-xs">A: We're in active development. Waitlisted users will be notified first.</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <h3 className="text-cyan-300 font-mono text-xs font-bold mb-1">Q: How do I get featured?</h3>
                      <p className="text-gray-300 text-xs">A: Submit to the Pulse with strong traction and clear positioning.</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <h3 className="text-cyan-300 font-mono text-xs font-bold mb-1">Q: Billboard allocation?</h3>
                      <p className="text-gray-300 text-xs">A: Pre-order first-come-first-served for early tiers.</p>
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