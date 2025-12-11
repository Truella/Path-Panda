'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TOUR_CREATION_STEPS from '../../constants/tourSteps';

interface TourStepsProps {
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const TourSteps: React.FC<TourStepsProps> = ({ className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 py-12 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          How to Create a Tour
        </h2>
        <p className="text-lg text-gray-600">
          Follow these steps to create and embed your onboarding tour
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-16"
      >
        {TOUR_CREATION_STEPS.map((step) => (
          <motion.div
            key={step.id}
            id={step.id}
            variants={stepVariants}
            className="flex flex-col lg:flex-row items-center gap-8"
          >
            {/* Step Number and Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 space-y-4"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                  className="shrink-0 w-12 h-12 bg-gradient-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white rounded-full flex items-center justify-center text-xl font-bold"
                >
                  {step.step}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed ml-16">
                {step.description}
              </p>
            </motion.div>

            {/* Image */}
            <motion.div variants={imageVariants} className="flex-1 w-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-gray-200"
              >
                <Image
                  src={step.imageUrl}
                  alt={`${step.title} - Step ${step.step}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TourSteps;
