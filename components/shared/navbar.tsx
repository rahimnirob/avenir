"use client"

import { useEffect, useState } from "react"
import { Terminal, PanelRightOpen, PanelRightClose } from "lucide-react"
import { useNavigation } from "../../hooks/use-navigation"
import Image from "next/image"

export default function Navbar() {
  const { toggleTerminal, sidebarVisible, toggleSidebar } = useNavigation()
  const [scrollRotation, setScrollRotation] = useState(0)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY
      
      setScrollRotation(prev => prev + scrollDelta * 0.5)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header 
      className="fixed top-0 left-0 right-0 h-16 w-full flex items-center justify-between px-4 md:px-6 border-b border-cyan-500/20 overflow-hidden z-50"
      style={{
        background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.03) 0%, rgba(0, 0, 0, 0.98) 50%, rgba(139, 92, 246, 0.03) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan" />
      </div>
      
      <div className="flex items-center gap-3 relative z-10">
        <button
          onClick={toggleTerminal}
          className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-400/20 text-gray-300 hover:text-cyan-300 hover:border-cyan-400/50 transition-all duration-300 group overflow-hidden"
          title="Toggle Terminal (Ctrl + `)"
        >
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <Terminal className="w-4 h-4 group-hover:scale-110 transition-transform relative z-10" />
          <span className="hidden sm:inline font-mono text-xs tracking-wider relative z-10">TERMINAL</span>
          
          {/* Active indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Enhanced AVENIR logo with spinning image and aura */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-3">
        <div className="relative group">
          {/* Logo aura effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-xl rounded-full scale-150 opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 blur-lg rounded-full scale-125 animate-pulse" />
          
          <div 
            className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-100"
            style={{ transform: `rotate(${scrollRotation}deg)` }}
          >
            <Image
              src="/avenir-removebg-preview.png"
              alt="AVENIR Logo"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
              priority
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-xl md:text-2xl font-bold tracking-[0.3em] bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent animate-gradient">
            AVENIR
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="relative">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping absolute" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
            <span className="text-[10px] font-mono text-cyan-400/70">LIVE</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <button
          onClick={toggleSidebar}
          className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-l from-purple-500/10 to-transparent border border-purple-400/20 text-gray-300 hover:text-purple-300 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden"
          title="Toggle Sidebar"
        >
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-l from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <span className="hidden md:inline font-mono text-xs tracking-wider relative z-10">
            {sidebarVisible ? 'HIDE' : 'SHOW'}
          </span>
          {sidebarVisible ? (
            <PanelRightClose className="w-4 h-4 group-hover:scale-110 transition-transform relative z-10" />
          ) : (
            <PanelRightOpen className="w-4 h-4 group-hover:scale-110 transition-transform relative z-10" />
          )}
          
          {/* Active indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-l from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(64px);
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </header>
  )
}