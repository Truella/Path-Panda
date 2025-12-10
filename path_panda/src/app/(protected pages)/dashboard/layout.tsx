import type React from "react"
import { Poppins } from "next/font/google"
import type { Metadata } from "next"
import Providers from "@/app/providers"
import "../../globals.css"
import { Toaster } from "@/components/ui/sonner"


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
    <html lang="en">
      <body className={`${poppins.className} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
