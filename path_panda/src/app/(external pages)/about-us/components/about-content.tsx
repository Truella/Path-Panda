// src/components/about-content.tsx
export default function AboutContent() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 grid gap-20 lg:gap-28">

        {/* Our Mission */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#2d2d2f]">Our Mission</h2>
          <p className="mt-6 text-xl md:text-2xl text-[#2d2d2f]/70 leading-relaxed max-w-3xl mx-auto">
            To empower developers and product teams with{' '}
            <span className="text-[#7a5e46] font-medium">beautiful, intuitive onboarding experiences</span>{' '}
            that inspire confidence from the very first interaction.
          </p>
        </div>

        {/* What Makes Us Different */}
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-[#2d2d2f] text-center mb-12">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Ultra-light embeddable script (<10KB)",
              "Smooth animations powered by Framer Motion",
              "Real-time analytics & heatmaps",
              "No-code step builder",
              "Clean, modern dashboard",
              "Branching logic & personalization",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-[#f9f7fe] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-10 h-10 bg-[#7a5e46] rounded-full shrink-0 flex items-center justify-center text-white font-bold text-lg">
                  {i + 1}
                </div>
                <p className="text-lg font-medium text-[#2d2d2f]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Team */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#2d2d2f]">The Team</h2>
          <p className="mt-6 text-xl md:text-2xl text-[#2d2d2f]/70 leading-relaxed max-w-3xl mx-auto">
            A collaboration of passionate frontend engineers working together to create a{' '}
            <span className="text-[#7a5e46] font-medium">complete onboarding ecosystem</span> — from marketing site to dashboard to the embeddable widget.
          </p>
        </div>

        {/* Our Vision – the money shot */}
        <div className="bg-linear-to-r from-[#7a5e46] to-[#a67c52] rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black">Our Vision</h2>
          <p className="mt-8 text-xl md:text-3xl leading-relaxed max-w-4xl mx-auto">
            To make onboarding experiences accessible, customizable, and powerful for{' '}
            <span className="underline decoration-white/50">every product</span> — no matter the size or complexity.
          </p>
        </div>

      </div>
    </section>
  )
}