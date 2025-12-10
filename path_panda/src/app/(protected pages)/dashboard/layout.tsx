import type React from "react"
import { Poppins } from "next/font/google"
import Providers from "@/app/providers"
import "../../globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata = {
  title: "PathPanda | Dashboard",
  description: "Create and manage onboarding tours",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={poppins.className}>
      <Providers>{children}</Providers>
    </div>
  )
}
