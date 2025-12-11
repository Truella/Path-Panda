'use client';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue
} from 'framer-motion';
import { JSX, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define types for the props
interface SlideData {
  title: string;
  description: string;
  animation: () => JSX.Element;
}

interface SlideProps {
  slide: SlideData;
  i: number;
  smoothX: MotionValue<number>;
}

function Slide({ slide, i, smoothX }: SlideProps) {
  const rotateY = useTransform(smoothX, (v: number) => {
    const offset = v + i * 100;
    return offset / 10;
  });

  const scale = useTransform(smoothX, (v: number) => {
    const offset = Math.abs(v + i * 100);
    return 1 - Math.min(offset / 1000, 0.1);
  });

  return (
    <div
      key={i}
      className="relative flex-none w-full h-full flex items-center justify-center px-6 md:px-12"
    >
      <motion.div
        className="w-full max-w-6xl"
        style={{
          rotateY,
          scale,
        }}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#7a5e46]/10 h-full flex flex-col">
          {/* Browser Bar */}
          <div className="h-16 bg-[#1a1a1a] flex items-center px-6 gap-3 shrink-0">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-sm text-gray-400 font-mono">
              pathpanda.app/dashboard
            </div>
          </div>

          {/* Animated Demo Area */}
          <div className="flex-1 bg-linear-to-br from-[#fef9f5] to-[#f9f7fe] flex items-center justify-center p-8 md:p-12">
            <div className="max-w-2xl">
              <slide.animation />
            </div>
          </div>

          {/* Caption */}
          <div className="p-8 md:p-12 bg-white border-t border-[#7a5e46]/10">
            <h3 className="text-3xl md:text-5xl font-black text-[#2d2d2f] leading-tight">
              {slide.title}
            </h3>
            <p className="mt-4 text-lg md:text-2xl text-[#2d2d2f]/70 max-w-3xl">
              {slide.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="bg-gradient-to-b from-[#f9f7fe] via-[#fef9f5] to-white py-28 px-6 md:px-12">

      <motion.div 
        className="text-center mb-24 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-5xl md:text-6xl font-black text-[#2d2d2f]">
          Build tours that feel like magic
        </h2>
        <p className="mt-4 text-xl md:text-2xl text-[#2d2d2f]/70">
          <span className="line-through opacity-40">abracadabra?</span> A PathPanda
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-32">

        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#2d2d2f] mb-6">
              Smart Step-by-Step Tours
            </h2>
            <p className="text-lg md:text-xl text-[#2d2d2f]/70 leading-relaxed">
              Create guided multi-step experiences that highlight key 
              features, reduce confusion, and increase user activation — 
              with zero code changes on your host site.
            </p>
          </motion.div>

          <motion.div 
            className="w-full"
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotateY: 2 }}
          >
            <img
              src="/images/Steps.png"
              alt="Feature image"
              className="w-full h-auto rounded-xl shadow-xl object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div 
            className="w-full order-1 md:order-0"
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotateY: -2 }}
          >
            <img
              src="/images/Customizable.png"
              alt="Feature image"
              className="w-full h-auto rounded-xl shadow-xl object-cover"
            />
          </motion.div>

          <motion.div 
            className="order-0 md:order-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#2d2d2f] mb-6">
              Fully Customizable & Embeddable
            </h2>
            <p className="text-lg md:text-xl text-[#2d2d2f]/70 leading-relaxed">
              Add your onboarding widget to any website in seconds with a tiny 
              script. Style it, animate it, and control every step directly 
              from your dashboard.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#2d2d2f] mb-6">
              Analytics That Actually Help
            </h2>
            <p className="text-lg md:text-xl text-[#2d2d2f]/70 leading-relaxed">
              Track completions, skipped steps, engagement, and improvements — 
              giving you instant clarity on what users struggle with.
            </p>
          </motion.div>

          <motion.div 
            className="w-full"
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotateY: 2 }}
          >
            <img
              src="/images/Analytics.png"
              alt="Feature image"
              className="w-full h-auto rounded-xl shadow-xl object-cover"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}