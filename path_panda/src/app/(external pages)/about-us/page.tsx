import AboutHero from "./components/about-hero"
import AboutContent from "./components/about-content"

export const metadata = {
  title: "About PathPanda – Beautiful Onboarding, Made Simple",
  description: "We build smart, lightweight onboarding tools that help teams communicate product value instantly.",
}

export default function AboutUsPage() {
  return (
    <>
      <AboutHero />
      <AboutContent />
    </>
  )
}