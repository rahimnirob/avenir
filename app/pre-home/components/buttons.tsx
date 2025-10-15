"use client"

interface ButtonProps {
  text: string
  onClickAction: () => void
  variant?: "primary" | "secondary"
}

export default function Button({ text, onClickAction, variant = "primary" }: ButtonProps) {
  return (
    <button
      onClick={onClickAction}
      className={`
        relative w-full px-8 py-4 font-mono text-sm tracking-wider uppercase
        transition-all duration-300 overflow-hidden group
        ${
          variant === "primary"
            ? "bg-gradient-to-r from-gray-100 via-white to-gray-100 text-black hover:from-white hover:via-gray-50 hover:to-white shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:scale-[1.02]"
            : "bg-transparent text-white border-2 border-gray-400 hover:border-white hover:bg-gradient-to-r hover:from-white/10 hover:via-white/5 hover:to-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.02]"
        }
      `}
    >
      {/* Animated shimmer effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm" />

      <div className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent" />

      {/* Diagonal light sweep */}
      <div className="absolute inset-0 -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-1000 bg-gradient-to-br from-transparent via-white/30 to-transparent blur-md" />

      {/* Pulse effect on hover */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 group-hover:animate-pulse" />

      {/* Text with enhanced effects */}
      <span className="relative z-10 flex items-center justify-center gap-2 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300">
        {text}
        <span className="inline-block w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse group-hover:shadow-[0_0_10px_currentColor]" />
      </span>

      {/* Corner accents with enhanced glow */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_12px_currentColor] group-hover:w-6 group-hover:h-6" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_12px_currentColor] group-hover:w-6 group-hover:h-6" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_12px_currentColor] group-hover:w-6 group-hover:h-6" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_12px_currentColor] group-hover:w-6 group-hover:h-6" />

      {/* Inner corner dots */}
      <div className="absolute top-2 left-2 w-1 h-1 bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full shadow-[0_0_6px_currentColor]" />
      <div className="absolute top-2 right-2 w-1 h-1 bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full shadow-[0_0_6px_currentColor]" />
      <div className="absolute bottom-2 left-2 w-1 h-1 bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full shadow-[0_0_6px_currentColor]" />
      <div className="absolute bottom-2 right-2 w-1 h-1 bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full shadow-[0_0_6px_currentColor]" />

      {/* Scanning line effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite]" />

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Radial glow from center */}
      <div className="absolute inset-0 bg-radial-gradient from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Edge glow lines */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

      <style jsx>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </button>
  )
}