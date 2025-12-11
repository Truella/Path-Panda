'use client';

import { motion } from 'framer-motion';
import { AlertCircle, XCircle, FileQuestion, Layers } from 'lucide-react';

const troubleshootingItems = [
  {
    icon: FileQuestion,
    title: 'Element not found',
    description: 'Incorrect CSS selector',
    solution: 'Double-check your CSS selector matches the target element',
  },
  {
    icon: XCircle,
    title: "Script doesn't load",
    description: 'Missing path',
    solution: 'Verify the script path is correct and the file is accessible',
  },
  {
    icon: AlertCircle,
    title: "Tour doesn't start",
    description: 'No active steps defined',
    solution: 'Ensure you have at least 5 steps and the tour is activated',
  },
  {
    icon: Layers,
    title: 'Avatar overlapping elements',
    description: 'Adjust position or theme',
    solution: 'Change the step position or modify z-index in your theme',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Troubleshooting() {
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2
          id="troubleshooting"
          className="text-3xl font-bold text-[#2d2d2f] border-b-2 border-amber-600 pb-3 mb-8"
        >
          Troubleshooting
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {troubleshootingItems.map((issue, index) => {
          const Icon = issue.icon;
          return (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {issue.title}
                  </h3>
                  <p className="text-sm text-red-600 mb-2 font-medium">
                    {issue.description}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-medium text-gray-700">
                      Solution:{' '}
                    </span>
                    {issue.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">
              Still having issues?
            </h4>
            <p className="text-sm text-amber-800">
              Check the browser console for detailed error messages or contact
              support for assistance.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
