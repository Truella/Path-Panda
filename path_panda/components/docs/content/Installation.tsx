'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Installation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        id="installation"
        className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6"
      >
        Installation
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-4 text-lg text-gray-700"
      >
        Include the script on your website by adding the embed script from your
        tour dashboard before the closing `&lt;body&gt;` tag of your HTML file:
      </motion.p>
      <motion.pre
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.01 }}
        className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"
      >
        <code>
          {`<script src="https://path-panda.pages.dev/PathPandaWidget.js" data-tour-id="YOUR_ID"></script>`}
        </code>
      </motion.pre>
    </motion.section>
  );
}
