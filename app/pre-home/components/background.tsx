"use client"

import { useState, useEffect } from "react"

export default function Background() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          33% { transform: translateY(-25px) translateX(20px) scale(1.03); }
          66% { transform: translateY(10px) translateX(-15px) scale(0.98); }
        }
        
        @keyframes chromePulse {
          0%, 100% { opacity: 0.3; filter: blur(120px); }
          50% { opacity: 0.5; filter: blur(140px); }
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.28; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
      `}</style>

      <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
        {/* Base gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-neutral-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-950 via-black to-zinc-900 opacity-70" />

        {/* Animated gradient overlays */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-gray-700/25 via-transparent to-neutral-600/20"
          style={{ animation: "shimmer 14s ease-in-out infinite" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-bl from-slate-600/15 via-transparent to-zinc-700/25"
          style={{ animation: "shimmer 18s ease-in-out infinite", animationDelay: "5s" }}
        />

        {/* Refined grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.5) 1.5px, transparent 1.5px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {isClient && (
          <>
            {/* Main orb lights - more dramatic */}
            <div
              className="absolute top-[-20%] left-[-12%] w-[1000px] h-[1000px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(240, 240, 240, 0.35), rgba(200, 200, 200, 0.15) 40%, rgba(160, 160, 160, 0.05) 70%, transparent)",
                animation: "float 35s ease-in-out infinite, chromePulse 22s ease-in-out infinite",
              }}
            />
            <div
              className="absolute bottom-[-25%] right-[-18%] w-[1100px] h-[1100px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(220, 220, 220, 0.32), rgba(180, 180, 180, 0.12) 40%, rgba(140, 140, 140, 0.04) 70%, transparent)",
                animation: "float 42s ease-in-out infinite reverse, chromePulse 28s ease-in-out infinite",
                animationDelay: "10s",
              }}
            />
            <div
              className="absolute top-[30%] right-[8%] w-[850px] h-[850px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.28), rgba(210, 210, 210, 0.1) 40%, transparent 70%)",
                animation: "float 48s ease-in-out infinite, chromePulse 26s ease-in-out infinite",
                animationDelay: "18s",
              }}
            />
            <div
              className="absolute top-[20%] left-[25%] w-[700px] h-[700px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(230, 230, 230, 0.26), rgba(190, 190, 190, 0.09) 40%, transparent 70%)",
                animation: "float 38s ease-in-out infinite, chromePulse 30s ease-in-out infinite",
                animationDelay: "7s",
              }}
            />
            <div
              className="absolute bottom-[15%] left-[10%] w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(210, 210, 210, 0.24), rgba(170, 170, 170, 0.08) 40%, transparent 70%)",
                animation: "float 44s ease-in-out infinite, chromePulse 24s ease-in-out infinite",
                animationDelay: "14s",
              }}
            />
          </>
        )}

        {/* Rotating gradient backdrop */}
        {isClient && (
          <div
            className="absolute top-1/2 left-1/2 w-[160%] h-[160%] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent 25%, rgba(220, 220, 220, 0.25), transparent 50%, rgba(200, 200, 200, 0.2), transparent 75%, rgba(180, 180, 180, 0.15), transparent)",
              animation: "rotate 100s linear infinite",
            }}
          />
        )}

        {/* Enhanced floating particles */}
        {isClient && (
          <div className="absolute inset-0">
            {[...Array(18)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${3 + Math.random() * 4}px`,
                  height: `${3 + Math.random() * 4}px`,
                  background: `rgba(${200 + Math.random() * 55}, ${200 + Math.random() * 55}, ${200 + Math.random() * 55}, ${0.3 + Math.random() * 0.3})`,
                  boxShadow: `0 0 ${12 + Math.random() * 15}px rgba(255, 255, 255, ${0.3 + Math.random() * 0.3})`,
                  animation: `drift ${20 + Math.random() * 25}s ease-in-out infinite, chromePulse ${12 + Math.random() * 18}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 20}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Depth and vignette layers */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/80" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-600/10 via-transparent to-transparent" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Subtle light streaks */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent"
          style={{ animation: "shimmer 10s ease-in-out infinite" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent"
          style={{ animation: "shimmer 12s ease-in-out infinite", animationDelay: "3s" }}
        />

        {/* Final atmospheric blend */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-transparent to-neutral-950/40" />
      </div>
    </>
  )
}