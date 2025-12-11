'use client';

import { motion } from 'framer-motion';

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2d2f]">
          Documentation
        </h1>
        <p className="mt-4 text-[#2d2d2f]/80 text-lg sm:text-xl">
          Welcome to PathPanda! <br />
          <br />
          The video below is a guide on how our site functions and will help you
          get started with integrating and using our product tour solution.
        </p>
      </motion.section>

      {/* YouTube Video Embed */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative w-full overflow-hidden rounded-lg shadow-xl"
          style={{ paddingTop: '56.25%' }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/5QWTNa3kb84"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </motion.div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-12"
      >
        <p>
          Please use the navigation on the left to explore the different
          sections.
        </p>
      </motion.div>
    </div>
  );
}
