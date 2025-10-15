"use client"

import type React from "react"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, ArrowDown, Play, X, GripHorizontal, Terminal as TerminalIcon } from "lucide-react"
import { useNavigation } from "../../hooks/use-navigation"
import { COMMANDS, getCommandSuggestions } from "../../lib/commands"

export default function Terminal() {
  const {
    terminalVisible,
    toggleTerminal,
    navigateToPage,
    addToHistory,
    commandHistory,
    prefillCommand,
    setPrefillCommand,
  } = useNavigation()

  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [terminalHeight, setTerminalHeight] = useState(200)
  const [terminalWidth, setTerminalWidth] = useState(1400)
  const [isDraggingHeight, setIsDraggingHeight] = useState(false)
  const [isDraggingWidth, setIsDraggingWidth] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragStartY = useRef(0)
  const dragStartX = useRef(0)
  const dragStartHeight = useRef(0)
  const dragStartWidth = useRef(0)

  useEffect(() => {
    if (prefillCommand) {
      setInput(prefillCommand)
      setSuggestions(getCommandSuggestions(prefillCommand))
      setPrefillCommand(null)
      inputRef.current?.focus()
    }
  }, [prefillCommand, setPrefillCommand])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault()
        toggleTerminal()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [toggleTerminal])

  useEffect(() => {
    setSuggestions(getCommandSuggestions(input))
  }, [input])

  // Handle height dragging
  useEffect(() => {
    if (!isDraggingHeight) return

    const handleMouseMove = (e: MouseEvent) => {
      const delta = dragStartY.current - e.clientY
      const newHeight = Math.max(150, Math.min(600, dragStartHeight.current + delta))
      setTerminalHeight(newHeight)
    }

    const handleMouseUp = () => {
      setIsDraggingHeight(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDraggingHeight])

  // Handle width dragging
  useEffect(() => {
    if (!isDraggingWidth) return

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - dragStartX.current
      const newWidth = Math.max(600, Math.min(1800, dragStartWidth.current + delta))
      setTerminalWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsDraggingWidth(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDraggingWidth])

  const helpText = useMemo(
    () =>
      [
        "AVAILABLE COMMANDS:",
        ...Object.keys(COMMANDS).map((c) => `  - ${c}`),
        "",
        "USAGE: type a command and press Enter or click RUN",
      ].join("\n"),
    [],
  )

  const print = useCallback((line: string) => setOutput((o) => [...o, line]), [])
  const clear = useCallback(() => setOutput([]), [])

  const handleRun = useCallback(async () => {
    const cmd = input.trim()
    if (!cmd) return
    addToHistory(cmd)
    setSelectedIndex(-1)

    const mapped = COMMANDS[cmd]
    if (!mapped) {
      print(`SYNTAX ERROR: Command not recognized -> "${cmd}"`)
      return
    }

    if (mapped === "CLEAR_TERMINAL") {
      clear()
      setInput("")
      return
    }
    if (mapped === "SHOW_HELP") {
      print(helpText)
      setInput("")
      return
    }
    if (mapped === "SHOW_STATUS") {
      print(`STATUS: You are on "${window.location.pathname}"`)
      setInput("")
      return
    }
    if (mapped === "HIDE_TERMINAL") {
      toggleTerminal()
      setInput("")
      return
    }

    print(`EXECUTING... ${cmd}`)
    setInput("")
    await navigateToPage(mapped)
  }, [input, addToHistory, print, clear, helpText, navigateToPage, toggleTerminal])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      void handleRun()
    } else if (e.key === "Tab") {
      e.preventDefault()
      if (suggestions.length > 0) setInput(suggestions[0])
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const next = Math.min(selectedIndex + 1, commandHistory.length - 1)
      setSelectedIndex(next)
      const val = commandHistory[next]
      if (val) setInput(val)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = Math.max(selectedIndex - 1, -1)
      setSelectedIndex(next)
      if (next === -1) setInput("")
      else setInput(commandHistory[next] || "")
    } else if (e.key === "Escape") {
      setSuggestions([])
    }
  }

  const handleHeightDragStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDraggingHeight(true)
    dragStartY.current = e.clientY
    dragStartHeight.current = terminalHeight
  }

  const handleWidthDragStart = (e: React.MouseEvent, side: 'left' | 'right') => {
    e.preventDefault()
    setIsDraggingWidth(true)
    dragStartX.current = e.clientX
    dragStartWidth.current = terminalWidth
  }

  const outputHeight = terminalHeight - 120

  return (
    <AnimatePresence>
      {terminalVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed left-0 right-0 bottom-0 z-50 flex justify-center"
        >
          <div 
            className="relative mx-3 md:mx-6 mb-3"
            style={{ maxWidth: `${terminalWidth}px`, width: '100%' }}
          >
            {/* Left resize handle */}
            <div
              className="absolute left-0 top-0 bottom-0 w-3 cursor-ew-resize hover:bg-cyan-400/10 transition-colors z-10 flex items-center justify-center group"
              onMouseDown={(e) => handleWidthDragStart(e, 'left')}
            >
              <div className="w-0.5 h-16 bg-cyan-500/30 rounded-full group-hover:bg-cyan-400/60 transition-colors" />
            </div>

            {/* Right resize handle */}
            <div
              className="absolute right-0 top-0 bottom-0 w-3 cursor-ew-resize hover:bg-cyan-400/10 transition-colors z-10 flex items-center justify-center group"
              onMouseDown={(e) => handleWidthDragStart(e, 'right')}
            >
              <div className="w-0.5 h-16 bg-cyan-500/30 rounded-full group-hover:bg-cyan-400/60 transition-colors" />
            </div>

            <div 
              className="relative rounded-xl border border-cyan-500/30 shadow-[0_-20px_60px_rgba(6,182,212,0.15)] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(0, 0, 0, 0.95) 50%, rgba(139, 92, 246, 0.05) 100%)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Decorative grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d415_1px,transparent_1px),linear-gradient(to_bottom,#06b6d415_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

              {/* Top drag handle for height */}
              <div
                className="relative flex items-center justify-center py-2 cursor-ns-resize hover:bg-cyan-500/5 transition-colors group border-b border-cyan-500/20"
                onMouseDown={handleHeightDragStart}
              >
                <div className="flex items-center gap-2">
                  <GripHorizontal className="w-5 h-5 text-cyan-500/40 group-hover:text-cyan-400/70 transition-colors" />
                  <span className="text-xs text-cyan-400/60 font-mono">DRAG TO RESIZE</span>
                  <GripHorizontal className="w-5 h-5 text-cyan-500/40 group-hover:text-cyan-400/70 transition-colors" />
                </div>
              </div>

              <div className="relative z-10 p-3 md:p-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-500/20">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <TerminalIcon className="w-4 h-4 text-cyan-400" />
                      <span className="font-mono text-sm tracking-wider text-cyan-300 font-semibold">
                        AVENIR.TERMINAL
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-400 font-mono">ONLINE</span>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-cyan-300 transition-colors p-1 rounded hover:bg-cyan-500/10"
                    onClick={toggleTerminal}
                    aria-label="Hide Terminal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Output area */}
                <div 
                  className="overflow-y-auto rounded-lg bg-black/60 border border-cyan-500/20 p-3 font-mono text-xs whitespace-pre-wrap shadow-inner"
                  style={{ height: `${outputHeight}px` }}
                >
                  {output.length === 0 ? (
                    <div className="space-y-1">
                      <div className="text-cyan-400">
                        <span className="text-emerald-400">{'>'}</span> AVENIR Terminal v1.0.0
                      </div>
                      <div className="text-gray-500">
                        Type <span className="text-cyan-400">"help"</span> to see available commands.
                      </div>
                    </div>
                  ) : (
                    output.map((line, i) => (
                      <div key={i} className="leading-5 text-gray-100">
                        <span className="text-cyan-400 mr-2">{'>'}</span>
                        {line}
                      </div>
                    ))
                  )}
                </div>

                {/* Input area */}
                <div className="relative mt-3">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 font-mono text-sm">
                      $
                    </div>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      placeholder="Type a command (e.g. exec.about) ..."
                      className="w-full bg-gradient-to-r from-black/80 to-black/60 border border-cyan-500/30 rounded-lg py-3 pl-8 pr-32 font-mono text-sm outline-none focus:border-cyan-400/60 focus:bg-black/80 placeholder:text-gray-500 text-gray-100 transition-all shadow-lg"
                    />
                  </div>

                  {/* Suggestions dropdown */}
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.ul
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full mb-2 left-0 right-32 bg-gradient-to-br from-cyan-950/40 to-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/20 overflow-hidden"
                      >
                        {suggestions.map((s) => (
                          <li key={s}>
                            <button
                              className="w-full text-left px-4 py-2.5 font-mono text-sm hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-100 transition-all border-b border-cyan-500/10 last:border-0"
                              onClick={() => setInput(s)}
                            >
                              <span className="text-cyan-400 mr-2">→</span>
                              {s}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  {/* Control buttons */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <button
                      className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/30 hover:bg-cyan-500/20 transition-all text-cyan-300 hover:text-cyan-100"
                      title="Previous command (↑)"
                      onClick={() => {
                        const next = Math.min(selectedIndex + 1, commandHistory.length - 1)
                        setSelectedIndex(next)
                        const val = commandHistory[next]
                        if (val) setInput(val)
                      }}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/30 hover:bg-cyan-500/20 transition-all text-cyan-300 hover:text-cyan-100"
                      title="Next command (↓)"
                      onClick={() => {
                        const next = Math.max(selectedIndex - 1, -1)
                        setSelectedIndex(next)
                        if (next === -1) setInput("")
                        else setInput(commandHistory[next] || "")
                      }}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleRun}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-sm hover:from-emerald-400 hover:to-cyan-400 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                      aria-label="Run command"
                    >
                      <Play className="w-4 h-4" fill="currentColor" />
                      RUN
                    </button>
                  </div>
                </div>

                {/* Help text */}
                <div className="mt-3 pt-3 border-t border-cyan-500/20 flex items-center justify-between">
                  <div className="text-[11px] text-gray-500 font-mono space-x-3">
                    <span>
                      <kbd className="px-1.5 py-0.5 bg-black/40 border border-cyan-500/20 rounded text-cyan-400">Ctrl</kbd>
                      {' + '}
                      <kbd className="px-1.5 py-0.5 bg-black/40 border border-cyan-500/20 rounded text-cyan-400">`</kbd>
                      {' toggle'}
                    </span>
                    <span>
                      <kbd className="px-1.5 py-0.5 bg-black/40 border border-cyan-500/20 rounded text-cyan-400">Tab</kbd>
                      {' autocomplete'}
                    </span>
                    <span>
                      <kbd className="px-1.5 py-0.5 bg-black/40 border border-cyan-500/20 rounded text-cyan-400">↑↓</kbd>
                      {' history'}
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-400/60 font-mono">
                    {commandHistory.length} commands executed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}