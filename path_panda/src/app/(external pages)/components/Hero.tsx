'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const tagline =
    'Guide users effortlessly with an embeddable product tour that feels truly seamless.';
  const [typed, setTyped] = useState('');
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTyped(tagline.slice(0, index + 1));
      index++;
      if (index === tagline.length) {
        clearInterval(interval);
        setTimeout(() => setShowCTA(true), 400);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[70vh] lg:min-h-[65vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-[#f9f7fe] via-[#fef9f5] to-[#faf4ed]">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7a5e46]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-[#d4a574]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7a5e46]/3 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
<h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
          <span className="block text-[#555557] font-extrabold opacity-0 translate-y-8 animate-reveal delay-200">
            Welcome to
          </span>
          <span className="block bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent opacity-0 translate-y-8 animate-reveal delay-500">
            PathPanda
          </span>
        </h1>

        <div className="mt-6 text-lg md:text-xl lg:text-2xl font-medium text-[#2d2d2f]/80 ">
          <p className="inline-block">
            {typed}
            <span className="inline-block w-1 h-8 bg-[#7a5e46] animate-blink ml-1 align-middle" />
          </p>
        </div>
        <div
          className={`mt-4 flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ${
            showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Link href="/get-started" passHref>
            <button className="group px-6 py-3 bg-[#7a5e46] text-white font-semibold text-base rounded-full hover:bg-[#6b513b] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2.5 hover:gap-4">
              Try the Live Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </Link>

          <Link href="/docs" passHref>
            <button className="px-6 py-3 border-2 border-[#7a5e46] text-[#7a5e46] font-semibold text-base rounded-full hover:bg-[#7a5e46]/5 transition-all duration-300 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5" />
              Read the Docs
            </button>
          </Link>
        </div>
        <p
          className={`mt-8 text-[#2d2d2f]/60 text-sm tracking-wider opacity-0 animate-fadeIn delay-1000 ${
            showCTA ? 'animate-fadeIn' : ''
          }`}
        >
          Trusted by 2,000+ creators • Used on 50,000+ product tours worldwide
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
