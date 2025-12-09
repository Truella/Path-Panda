import React from 'react'
import Hero from "./components/Hero"
import Features from './components/Features'
import HowItWorks from "./components/how-it-works" 
import FaqAccordion from './components/faq-accordion'

export default function page() {
  return (
    
    <div>
      <Hero/>
      <Features/>
      <HowItWorks/>
      <FaqAccordion/>
     </div>
  )
}
 