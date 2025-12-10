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
          <div className="flex-1 bg-gradient-to-br from-[#fef9f5] to-[#f9f7fe] flex items-center justify-center p-8 md:p-12">
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
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isRewinding, setIsRewinding] = useState(false);

  const x = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: isRewinding ? 150 : 300,
    damping: isRewinding ? 20 : 30,
  });

  const goNext = () => {
    if (index === slides.length - 1) return;
    setDirection(1);
    setIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (index === 0) return;
    setDirection(-1);
    setIndex((prev) => prev - 1);
  };

  // Auto-scroll + fast rewind at the end
  useEffect(() => {
    if (isHovered) return;

    const timer = setTimeout(() => {
      if (index === slides.length - 1) {
        setIsRewinding(true);
        x.set(0);
        setTimeout(() => {
          setIsRewinding(false);
          setIndex(0);
        }, 400);
      } else {
        goNext();
      }
    }, 4000); // Slightly longer pause for 3 cards

    return () => clearTimeout(timer);
  }, [index, isHovered]);

  useEffect(() => {
    if (!isRewinding) {
      x.set(-index * 100);
    }
  }, [index]);

  return (
    <section
      className="relative bg-linear-to-b from-[#f9f7fe] via-[#fef9f5] to-white py-24 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-5xl md:text-6xl font-black text-[#2d2d2f]">
          Build tours that feel like magic
        </h2>
        <p className="mt-4 text-xl md:text-2xl text-[#2d2d2f]/70">
          <span className="line-through opacity-40">abracadabra?</span> A PathPanda
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 md:px-12">
        <div className="relative h-[600px] md:h-screen md:max-h-[800px] overflow-hidden rounded-3xl shadow-2xl">
          {/* SLIDER */}
          <motion.div
            style={{ x: useTransform(smoothX, (v) => `${v}%`) }}
            className="absolute inset-0 flex"
          >
            {slides.map((slide, i) => (
              <Slide key={i} slide={slide} i={i} smoothX={smoothX} />
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          disabled={index === 0}
          className={`group absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 ${
            index === 0 ? 'opacity-40 cursor-not-allowed' : 'bg-white/95 hover:scale-110'
          } backdrop-blur-2xl rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300`}
        >
          <ChevronLeft className="w-10 h-10 md:w-14 md:h-14 text-[#7a5e46]" />
        </button>

        <button
          onClick={goNext}
          disabled={index === slides.length - 1}
          className={`group absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 ${
            index === slides.length - 1
              ? 'opacity-40 cursor-not-allowed'
              : 'bg-white/95 hover:scale-110'
          } backdrop-blur-2xl rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300`}
        >
          <ChevronRight className="w-10 h-10 md:w-14 md:h-14 text-[#7a5e46]" />
        </button>
      </div>
    </section>
  );
}

// NEW 3-CARD CONTENT WITH CUSTOM ANIMATIONS
const slides = [
  {
    title: 'Smart Step-by-Step Tours',
    description:
      'Create guided multi-step experiences that highlight key features, reduce confusion, and increase user activation — with zero code changes on your host site.',
    animation: () => (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((n, i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4, duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
            className="flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-[#7a5e46]/20"
          >
            <div className="w-16 h-16 bg-[#7a5e46] rounded-xl flex items-center justify-center text-white text-2xl font-black">
              {n}
            </div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-48 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-32" />
            </div>
            <ChevronRight className="w-8 h-8 text-[#7a5e46] ml-auto" />
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    title: 'Fully Customizable & Embeddable',
    description:
      'Add your onboarding widget to any website in seconds with a tiny script. Style it, animate it, and control every step through your dashboard.',
    animation: () => (
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block bg-white rounded-3xl p-10 shadow-2xl border-4 border-dashed border-[#7a5e46]"
        >
          <code className="text-lg md:text-2xl font-mono text-[#7a5e46">
            {'<script src="https://pathpanda.app/embed.js"></script>'}
          </code>
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 inline-block bg-[#7a5e46] text-white px-12 py-6 rounded-2xl text-2xl md:text-4xl font-black shadow-2xl"
        >
          Live in seconds
        </motion.div>
      </div>
    ),
  },
  {
    title: 'Analytics That Actually Help',
    description:
      'Track completions, skipped steps, engagement, and improvements — giving you instant clarity on what users struggle with.',
    animation: () => (
      <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
        {[
          { label: 'Completion Rate', value: '87%', color: 'bg-green-500' },
          { label: 'Drop-off Step 3', value: '24%', color: 'bg-red-500' },
          { label: 'Avg. Time', value: '2m 14s', color: 'bg-blue-500' },
          { label: 'Happy Users', value: '94%', color: 'bg-purple-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
            className="bg-white rounded-2xl p-6 shadow-xl text-center border border-[#7a5e46]/10"
          >
            <div className={`w-full h-24 ${stat.color} rounded-xl mb-4 flex items-end justify-center pb-4`}>
              <span className="text-3xl font-black text-white">{stat.value}</span>
            </div>
            <p className="text-sm text-[#2d2d2f]/70 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    ),
  },
];