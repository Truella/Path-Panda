import React from 'react'
import Hero from "./components/Hero"
import Features from './components/Features'
import HowItWorks from "./components/how-it-works" 
import FaqAccordion from './components/faq-accordion'
import VideoComponent from './components/video-component'

export default function Page() {
  return (
    <div>
      <Hero />
      {/*<VideoComponent /> */}
      <Features />
      <HowItWorks />
      <FaqAccordion />
    </div>
  );
}
 