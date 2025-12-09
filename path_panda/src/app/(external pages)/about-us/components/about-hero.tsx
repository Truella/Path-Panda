// src/components/about-hero.tsx
export default function AboutHero() {
  return (
    <section className="relative bg-linear-to-b from-[#f9f7fe] via-[#fef9f5] to-white py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#7a5e46]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-[#d4a574]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-[#2d2d2f]">
          About <span className="text-[#7a5e46]">PathPanda</span>
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-[#2d2d2f]/70 max-w-3xl mx-auto leading-relaxed">
          We build smart onboarding tools designed to help teams communicate product value{' '}
          <span className="text-[#7a5e46] font-semibold">quickly and clearly</span>.
          <br className="hidden md:block" />
          Our focus is simple: make user onboarding effortless.
        </p>
      </div>
    </section>
  )
}