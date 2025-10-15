import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import "./globals.css"
import { NavigationProvider } from "@/providers/navigation-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "AVENIR - The Future Awaits",
  description: "Request access to the future of innovation",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased dark`}>
      <body className="bg-[#0a0b0c] text-white overflow-x-hidden">
        <NavigationProvider>{children}</NavigationProvider>
      </body>
    </html>
  )
}