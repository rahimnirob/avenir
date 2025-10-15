"use client"

import { useNavigation } from "../../hooks/use-navigation"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { sidebarVisible } = useNavigation()

  return (
    <main 
      className={`pt-16 min-h-screen transition-all duration-500 ease-in-out ${
        sidebarVisible ? 'mr-72 md:mr-80' : 'mr-0'
      }`}
    >
      {children}
    </main>
  )
}