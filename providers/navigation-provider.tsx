"use client"

import type React from "react"

import { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export interface NavigationState {
  currentPage: string
  isLoading: boolean
  isFullscreen: boolean
  terminalVisible: boolean
  sidebarVisible: boolean
  commandHistory: string[]
  prefillCommand: string | null
}

export interface NavigationContextType extends NavigationState {
  navigateToPage: (page: string) => Promise<void>
  toggleFullscreen: () => void
  toggleTerminal: () => void
  toggleSidebar: () => void
  addToHistory: (command: string) => void
  setPrefillCommand: (cmd: string | null) => void
}

export const NavigationContext = createContext<NavigationContextType | null>(null)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const [state, setState] = useState<NavigationState>({
    currentPage: pathname || "/home",
    isLoading: false,
    isFullscreen: false,
    terminalVisible: true,
    sidebarVisible: true,
    commandHistory: [],
    prefillCommand: null,
  })

  useEffect(() => {
    setState((s) => ({ ...s, currentPage: pathname || "/home" }))
  }, [pathname])

  const navigateToPage = useCallback(
    async (page: string) => {
      setState((s) => ({ ...s, isLoading: true }))
      await new Promise((r) => setTimeout(r, 1500)) // 1.5s loading
      router.push(page)
      setTimeout(() => setState((s) => ({ ...s, isLoading: false })), 50)
    },
    [router],
  )

  const toggleFullscreen = useCallback(() => {
    setState((s) => ({ ...s, isFullscreen: !s.isFullscreen }))
  }, [])

  const toggleTerminal = useCallback(() => {
    setState((s) => ({ ...s, terminalVisible: !s.terminalVisible }))
  }, [])

  const toggleSidebar = useCallback(() => {
    setState((s) => ({ ...s, sidebarVisible: !s.sidebarVisible }))
  }, [])

  const addToHistory = useCallback((command: string) => {
    setState((s) => ({
      ...s,
      commandHistory: [command, ...s.commandHistory].slice(0, 50),
    }))
  }, [])

  const setPrefillCommand = useCallback((cmd: string | null) => {
    setState((s) => ({ ...s, prefillCommand: cmd }))
  }, [])

  const value = useMemo<NavigationContextType>(
    () => ({
      ...state,
      navigateToPage,
      toggleFullscreen,
      toggleTerminal,
      toggleSidebar,
      addToHistory,
      setPrefillCommand,
    }),
    [state, navigateToPage, toggleFullscreen, toggleTerminal, toggleSidebar, addToHistory, setPrefillCommand],
  )

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}

export function useNavigationContext() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error("useNavigationContext must be used within NavigationProvider")
  return ctx
}
