'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    {
      title: "Step 1 — Create Your Tour",
      description: "Log in, create a new tour, and define your steps through a simple dashboard. Each step gets its own ID, target selector, and message.",
    },
    {
      title: "Step 2 — Embed the Script",
      description: "Copy your auto-generated embed code and paste it into any site. The widget instantly becomes active — no redeploy required.",
    },
    {
      title: "Step 3 — Launch & Track",
      description: "Your users get a magical guided experience while you watch real-time analytics, completions, and drop-offs in your dashboard.",
    },
  ];

  // Auto-advance logic with proper pause/resume
  useEffect(() => {
    if (isHovered) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, steps.length]);

  return (
    <section className="bg-linear-to-b from-[#f9f7fe] to-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-[#2d2d2f]">
            How It Works
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-[#2d2d2f]/70 max-w-3xl mx-auto">
            Get your product tours live in minutes — no code, no hassle, no developers needed.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {steps.map((step, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={index}
                className="relative"
                onMouseEnter={() => setActiveIndex(index)} // Instant + locks
              >
                {/* Soft glow background */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="howItWorksGlow"
                      className="absolute -inset-6 bg-[#7a5e46]/8 rounded-3xl -z-10 blur-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  className={`
                    relative bg-white rounded-3xl p-10 shadow-lg border
                    transition-all duration-500 h-full
                    ${isActive ? 'border-[#7a5e46]/50 shadow-2xl' : 'border-transparent'}
                  `}
                  animate={{
                    scale: isActive ? 1.07 : 1,
                    y: isActive ? -16 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                  }}
                >
                  {/* Step Number */}
                  <div
                    className={`
                      w-20 h-20 rounded-3xl flex items-center justify-center text-4xl font-black mb-8
                      transition-all duration-700
                      ${isActive
                        ? 'bg-[#7a5e46] text-white shadow-2xl'
                        : 'bg-[#fef9f5] text-[#7a5e46]/20'
                      }
                    `}
                  >
                    {index + 1}
                  </div>

                  <h3
                    className={`
                      text-2xl md:text-3xl font-black mb-5 leading-tight
                      transition-colors duration-500
                      ${isActive ? 'text-[#2d2d2f]' : 'text-[#2d2d2f]/70'}
                    `}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`
                      text-lg leading-relaxed
                      transition-colors duration-500
                      ${isActive ? 'text-[#2d2d2f]/90' : 'text-[#2d2d2f]/60'}
                    `}
                  >
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Optional minimal dots */}
        <div className="flex justify-center gap-3 mt-12">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeIndex === i
                  ? 'bg-[#7a5e46] w-16'
                  : 'bg-[#7a5e46]/20 w-2 hover:w-8 hover:bg-[#7a5e46]/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}