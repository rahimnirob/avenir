"use client"

import { useMemo, useState } from "react"
import { ChevronDown, Clipboard, Check } from "lucide-react"
import { useNavigation } from "../../hooks/use-navigation"
import { COMMANDS } from "../../lib/commands"

type CmdItem = { label: string; path: string }

const codeGroups: { title: string; items: CmdItem[] }[] = [
  {
    title: "CODES — NAVIGATION",
    items: [
      { label: "exec.about", path: "/about" },
      { label: "exec.waitlist", path: "/waitlist" },
      { label: "exec.billboard", path: "/billboard" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "clear", path: "CLEAR_TERMINAL" },
      { label: "help", path: "SHOW_HELP" },
      { label: "status", path: "SHOW_STATUS" },
    ],
  },
]

export default function Sidebar() {
  const { currentPage, sidebarVisible, setPrefillCommand } = useNavigation()
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<string | null>(null)

  const activeMap = useMemo(() => {
    const m: Record<string, boolean> = {}
    for (const [cmd, path] of Object.entries(COMMANDS)) {
      if (typeof path === "string" && path.startsWith("/") && currentPage === path) m[cmd] = true
    }
    return m
  }, [currentPage])

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      setTimeout(() => setCopied(null), 2000)
    } catch {}
  }

  return (
    <aside 
      className={`fixed top-16 right-0 w-72 md:w-80 h-[calc(100vh-64px)] border-l border-cyan-500/20 overflow-y-auto z-40 transition-all duration-500 ease-in-out ${
        sidebarVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{
        background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.03) 0%, rgba(0, 0, 0, 0.95) 50%, rgba(139, 92, 246, 0.03) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d420_1px,transparent_1px),linear-gradient(to_bottom,#06b6d420_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none" />

      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <h2 className="text-xs font-mono text-cyan-400 tracking-wider">COMMAND PALETTE</h2>
          </div>
          <p className="text-xs text-gray-400">Click to execute or copy commands</p>
        </div>

        {codeGroups.map((group) => {
          const isOpen = open[group.title] ?? true
          return (
            <div key={group.title} className="mb-6">
              <button
                className="w-full flex items-center justify-between text-left text-xs tracking-widest text-cyan-300 hover:text-cyan-200 transition-colors mb-3 group"
                onClick={() => setOpen((o) => ({ ...o, [group.title]: !isOpen }))}
              >
                <span className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full group-hover:h-5 transition-all" />
                  {group.title}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
              </button>

              <div className={`space-y-2 transition-all duration-300 ${isOpen ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                {group.items.map((item) => {
                  const active = activeMap[item.label]
                  const isCopied = copied === item.label
                  return (
                    <div
                      key={item.label}
                      className={`group relative overflow-hidden rounded-lg border transition-all duration-300 ${
                        active 
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/40 shadow-lg shadow-cyan-500/10" 
                          : "bg-black/40 border-white/10 hover:border-cyan-400/30 hover:bg-black/60"
                      }`}
                    >
                      {/* Active indicator glow */}
                      {active && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 blur-xl" />
                      )}
                      
                      <div className="relative flex items-center justify-between px-3 py-2.5">
                        <button
                          onClick={() => setPrefillCommand(item.label)}
                          className={`flex-1 text-left text-sm font-mono truncate pr-2 transition-colors ${
                            active ? "text-cyan-100 font-semibold" : "text-gray-300 hover:text-cyan-300"
                          }`}
                          title="Click to send to terminal"
                        >
                          {active && <span className="text-cyan-400 mr-2">▶</span>}
                          {item.label}
                        </button>
                        <button
                          className={`flex-shrink-0 p-1 rounded transition-all ${
                            isCopied 
                              ? "bg-green-500/20 text-green-400" 
                              : "opacity-50 group-hover:opacity-100 text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                          }`}
                          onClick={() => handleCopy(item.label)}
                          title="Copy command"
                          aria-label="Copy command"
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Clipboard className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {group.title === "CODES — NAVIGATION" && isOpen && (
                <div className="mt-6 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 via-black/60 to-purple-950/20 backdrop-blur-xl p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    <h3 className="text-xs tracking-wider text-cyan-300 font-mono font-semibold">NAVIGATION COMMANDS</h3>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-start gap-2 text-gray-300 hover:text-cyan-300 transition-colors">
                      <code className="text-cyan-400">exec.about</code>
                      <span className="text-gray-500">→</span>
                      <span>About AVENIR</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-300 hover:text-cyan-300 transition-colors">
                      <code className="text-cyan-400">exec.waitlist</code>
                      <span className="text-gray-500">→</span>
                      <span>Join waitlist</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-300 hover:text-cyan-300 transition-colors">
                      <code className="text-cyan-400">exec.billboard</code>
                      <span className="text-gray-500">→</span>
                      <span>View pricing</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Footer tip */}
        <div className="mt-8 pt-4 border-t border-cyan-500/20">
          <div className="bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-lg p-3 border border-cyan-500/10">
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="text-cyan-400 font-mono">TIP:</span> Type commands in the terminal below or click here to auto-fill
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}