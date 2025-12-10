import type React from "react"
import { Poppins } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "TourFlow - Tour Management Dashboard",
  description: "Create and manage engaging onboarding tours with TourFlow"
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${poppins.className} font-sans antialiased`}>
      {children}
    </div>
  )
}
