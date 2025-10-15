"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ThreeViewer from "./components/ThreeViewer"
import Background from "./components/background"
import Button from "./components/buttons"
import { Zap, Circle, Activity, Cpu, Sparkles } from "lucide-react"

export default function PreHomePage() {
  const router = useRouter()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [glitchText, setGlitchText] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Periodic glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchText(true)
      setTimeout(() => setGlitchText(false), 200)
    }, 8000)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(glitchInterval)
    }
  }, [])

  const handleTeaserVideo = () => router.push("/videos/teaser-video")
  const handleEnterAvenir = () => router.push("/home")

  return (
    <>
      <Background />

      {/* Enhanced ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gray-400/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(calc(-50% + ${mousePosition.x * 0.5}px), calc(-50% + ${mousePosition.y * 0.5}px))`,
            transition: "transform 0.5s ease-out",
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="min-h-screen text-white flex flex-col items-center justify-center px-8 relative">
        {/* Enhanced logo section */}
        <div
          className={`absolute top-8 left-8 flex items-center space-x-4 group cursor-pointer transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/40 transition-all duration-300 rounded-lg animate-pulse" />
            <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-gray-400/30 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image
              src="/avenir.jpeg"
              alt="Avenir Logo"
              width={60}
              height={60}
              className="rounded-lg shadow-2xl border border-gray-600/50 group-hover:border-white/80 transition-all duration-300 relative grayscale group-hover:scale-105"
            />
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/60 rounded-lg transition-all duration-300" />
          </div>
          <div className="space-y-1">
            <div className="text-white text-lg font-bold tracking-[0.2em] uppercase font-mono group-hover:text-gray-200 group-hover:tracking-[0.25em] transition-all duration-300 flex items-center gap-2">
              AVENIR
              <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity group-hover:animate-pulse" />
            </div>
            <div className="text-gray-500 text-sm font-mono tracking-wider group-hover:text-gray-300 transition-colors flex items-center gap-2">
              Neural Systems
              <Activity className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Enhanced title with glitch effect */}
        <div
          className={`absolute top-20 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="relative">
            <h1 
              className={`text-7xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-[0.4em] font-mono uppercase ${
                glitchText ? 'glitch' : ''
              }`}
            >
              MIREN
            </h1>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent h-1 animate-scan" />
            <div className="absolute -inset-4 bg-white/5 blur-2xl opacity-50 animate-pulse" />
            
            {/* Floating particles around title */}
            <Sparkles className="absolute -top-2 -right-8 w-5 h-5 text-white/60 animate-pulse" style={{ animationDelay: '0s' }} />
            <Sparkles className="absolute -bottom-2 -left-8 w-4 h-4 text-gray-400/60 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Main content layout */}
        <div className="flex items-center justify-between w-full max-w-7xl mt-8 gap-8">
          {/* Enhanced left section */}
          <div
            className={`flex-1 space-y-8 text-left pr-12 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative group">
              {/* Enhanced decorative corner brackets */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-gray-500/60 group-hover:border-white/80 transition-all duration-300 group-hover:w-10 group-hover:h-10" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-gray-500/60 group-hover:border-white/80 transition-all duration-300 group-hover:w-10 group-hover:h-10" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-gray-500/60 group-hover:border-white/80 transition-all duration-300 group-hover:w-10 group-hover:h-10 opacity-50" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-gray-500/60 group-hover:border-white/80 transition-all duration-300 group-hover:w-10 group-hover:h-10 opacity-50" />

              <div className="flex items-start space-x-6 p-6 bg-black/40 backdrop-blur-md border border-gray-700/50 group-hover:border-gray-600/70 rounded-lg transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <div className="relative mt-2">
                  <Circle className="w-3 h-3 text-white fill-white animate-pulse" />
                  <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50" />
                  <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-30 animate-ping" />
                </div>

                <div className="space-y-6">
                  <p className="text-white text-xl leading-relaxed font-light group-hover:text-gray-100 transition-colors">
                    Welcome to the <span className="text-gray-200 font-medium group-hover:text-white transition-colors">future</span> of digital creation and AI
                    interaction.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed border-l-2 border-gray-500/70 group-hover:border-white/70 pl-4 transition-all duration-300">
                    Avenir is your gateway into immersive experiences where ideas come alive through advanced neural
                    entities.
                  </p>
                  <p className="text-gray-400 text-lg leading-relaxed italic group-hover:text-gray-300 transition-colors">
                    Meet <span className="text-gray-200 not-italic font-medium group-hover:text-white transition-colors">Miren</span>, your first guide into this
                    evolving digital universe.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced status indicators */}
            <div className="flex items-center gap-6 text-sm font-mono">
              <div className="flex items-center gap-2 group cursor-default">
                <div className="relative">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-50" />
                </div>
                <span className="text-gray-500 group-hover:text-gray-300 transition-colors">SYSTEMS ONLINE</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="relative">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                  <div className="absolute inset-0 bg-gray-400 rounded-full blur-sm opacity-50" />
                </div>
                <span className="text-gray-500 group-hover:text-gray-300 transition-colors">NEURAL LINK ACTIVE</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="relative">
                  <Cpu className="w-3 h-3 text-gray-400 animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
                <span className="text-gray-500 group-hover:text-gray-300 transition-colors">QUANTUM READY</span>
              </div>
            </div>
          </div>

          {/* Enhanced 3D viewer section */}
          <div
            className={`flex-shrink-0 relative transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-400/10 blur-3xl animate-pulse" />
            <div className="relative border-2 border-gray-700/60 rounded-lg overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-500 group">
              {/* Enhanced corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/80 z-10 group-hover:w-20 group-hover:h-20 transition-all duration-300" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/80 z-10 group-hover:w-20 group-hover:h-20 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gray-400/80 z-10 group-hover:w-20 group-hover:h-20 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gray-400/80 z-10 group-hover:w-20 group-hover:h-20 transition-all duration-300" />

              {/* Corner dots */}
              <div className="absolute top-3 left-3 w-2 h-2 bg-white rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              <div className="absolute bottom-3 left-3 w-2 h-2 bg-gray-400 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(200,200,200,0.8)]" />
              <div className="absolute bottom-3 right-3 w-2 h-2 bg-gray-400 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(200,200,200,0.8)]" />

              {/* Scanning line overlay */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent z-10 opacity-0 group-hover:opacity-100 group-hover:animate-[scanDown_3s_ease-in-out_infinite]" />

              <ThreeViewer />
            </div>
          </div>

          {/* Enhanced right section with buttons */}
          <div
            className={`flex-1 flex flex-col items-center space-y-8 pl-12 transition-all duration-1000 delay-700 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="w-full space-y-8">
              <div className="relative group w-full">
                <div className="absolute inset-0 bg-white/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <Button text="Play Teaser Video" onClickAction={handleTeaserVideo} variant="primary" />
                </div>
              </div>

              <div className="relative group w-full">
                <div className="absolute inset-0 bg-gray-300/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <Button text="Enter Avenir" onClickAction={handleEnterAvenir} variant="primary" />
                </div>
              </div>
            </div>

            {/* Enhanced system info box */}
            <div className="w-full mt-8 p-6 bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-md border border-gray-600/40 rounded-lg group hover:border-gray-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-8 bg-gradient-to-b from-white to-gray-500 group-hover:from-white group-hover:to-white/80 transition-all duration-300" />
                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider group-hover:text-gray-300 transition-colors">System Info</h3>
                <div className="ml-auto">
                  <Activity className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors animate-pulse" />
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                Experience next-generation AI interfaces powered by quantum neural networks and adaptive consciousness
                algorithms.
              </p>
              
              {/* Progress bars */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-20">Neural:</span>
                  <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-white to-gray-400 rounded-full animate-pulse" style={{ width: '87%' }} />
                  </div>
                  <span>87%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-20">Quantum:</span>
                  <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-white to-gray-400 rounded-full animate-pulse" style={{ width: '93%', animationDelay: '0.5s' }} />
                  </div>
                  <span>93%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced bottom status bar */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-8 text-xs font-mono text-gray-500 transition-all duration-1000 delay-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-2 group cursor-default">
            <span className="group-hover:text-gray-300 transition-colors">v2.0.1</span>
            <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-gray-400 transition-colors" />
          </div>
          <span className="w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-2 group cursor-default">
            <Cpu className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="group-hover:text-gray-300 transition-colors">NEURAL CORE</span>
          </div>
          <span className="w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-2 group cursor-default">
            <Activity className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
            <span className="group-hover:text-gray-300 transition-colors">LATENCY: <span className="text-green-400">12ms</span></span>
          </div>
          <span className="w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="group-hover:text-gray-300 transition-colors">UPTIME: 99.9%</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        
        @keyframes scanDown {
          0% {
            top: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
        
        .glitch {
          animation: glitch 0.2s cubic-bezier(.25, .46, .45, .94) both;
        }
        
        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
          }
          33% {
            transform: translate(-2px, 2px);
          }
          66% {
            transform: translate(2px, -2px);
          }
        }
      `}</style>
    </>
  )
}