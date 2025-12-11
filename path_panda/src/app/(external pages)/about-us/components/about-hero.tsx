'use client';

import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="relative bg-linear-to-b from-[#f9f7fe] via-[#fef9f5] to-white pt-32 pb-20 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-[#7a5e46]/5 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute bottom-32 right-20 w-80 h-80 bg-[#d4a574]/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.h1 
          className="text-6xl md:text-8xl font-black tracking-tight text-[#2d2d2f]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          About <motion.span 
            className="text-[#7a5e46]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            PathPanda
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="mt-8 text-xl md:text-2xl text-[#2d2d2f]/70 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          We build smart onboarding tools designed to help teams communicate product value{' '}
          <motion.span 
            className="text-[#7a5e46] font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            quickly and clearly
          </motion.span>
          .
          <br className="hidden md:block" />
          Our focus is simple: make user onboarding effortless.
        </motion.p>
      </div>
    </section>
  );
}