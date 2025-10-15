"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Monitor, Smartphone, AlertCircle } from "lucide-react"

export default function RootPage() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
      setShowNotice(mobile)
    }

    checkMobile()

    // Auto redirect after 5 seconds if mobile, immediately if desktop
    const timeout = setTimeout(() => {
      router.push("/pre-home")
    }, isMobile ? 5000 : 1500)

    return () => clearTimeout(timeout)
  }, [router, isMobile])

  const handleContinue = () => {
    router.push("/pre-home")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Logo/Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-[0.3em] font-mono uppercase">
            AVENIR
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <p className="text-gray-400 font-mono text-sm tracking-wider">
              Neural Systems Initializing
            </p>
          </div>
        </div>

        {/* Mobile Notice */}
        {showNotice && (
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-yellow-500/30 rounded-lg p-6 space-y-4 animate-[fadeIn_0.5s_ease-in-out]">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-3 flex-1">
                <h2 className="text-yellow-400 font-mono text-lg font-semibold">
                  Mobile Device Detected
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Avenir is currently optimized for <span className="text-white font-medium">desktop experiences</span>. 
                  For the best performance and visual quality, we recommend:
                </p>
                
                <div className="space-y-3 ml-4">
                  <div className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">
                      <span className="font-medium text-white">Desktop Mode:</span> Enable desktop site mode in your mobile browser settings
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">
                      <span className="font-medium text-white">Emulator:</span> Use Avenir in a desktop emulator for optimal performance
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-700/50">
                  <p className="text-gray-400 text-xs italic">
                    Full mobile optimization is coming soon. Thank you for your patience!
                  </p>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-mono text-sm tracking-wider uppercase rounded border border-gray-600 hover:border-gray-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Continue Anyway
              <span className="text-xs opacity-70">(5s)</span>
            </button>
          </div>
        )}

        {/* Desktop Loading */}
        {!showNotice && (
          <div className="text-center space-y-4">
            <div className="text-gray-400 font-mono text-lg animate-pulse">
              Initializing Neural Core...
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}

        {/* System Info */}
        <div className="text-center">
          <p className="text-gray-600 font-mono text-xs">
            v2.0.1 • QUANTUM NEURAL SYSTEMS
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}