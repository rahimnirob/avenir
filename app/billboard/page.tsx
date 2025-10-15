"use client"

import Navbar from "@/components/shared/navbar"
import Sidebar from "@/components/shared/sidebar"
import Terminal from "@/components/shared/terminal"
import MainLayout from "@/components/shared/main-layout"
import Intro from "./components/intro"
import Feature from "./components/feature"
import CTA from "./components/CTA"

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic'

export default function BillboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0b0c] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Navbar />
      <MainLayout>
        <Intro />
        <Feature />
        <CTA />
      </MainLayout>
      <Sidebar />
      <Terminal />
    </div>
  )
}