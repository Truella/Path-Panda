'use client';

export default function Features() {
  return (
    <section className="bg-linear-to-b from-[#f9f7fe] via-[#fef9f5] to-white py-28 px-6 md:px-12">

      <div className="text-center mb-24 max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-[#2d2d2f]">
          Build tours that feel like magic
        </h2>
        <p className="mt-4 text-xl md:text-2xl text-[#2d2d2f]/70">
          <span className="line-through opacity-40">abracadabra?</span> A PathPanda
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-32">

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[#2d2d2f] mb-6">
              Smart Step-by-Step Tours
            </h2>
            <p className="text-lg md:text-xl text-[#2d2d2f]/70 leading-relaxed">
              Create guided multi-step experiences that highlight key 
              features, reduce confusion, and increase user activation — 
              with zero code changes on your host site.
            </p>
          </div>

          <div className="w-full">
            <img
              src="/images/Steps.png"
              alt="Feature image"
              className="w-full h-auto rounded-xl shadow-xl object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
          <div className="w-full order-1 md:order-0">
            <img
              src="/images/Customizable.png"
              alt="Feature image"
              className="w-full h-auto rounded-xl shadow-xl object-cover"
            />
          </div>

          <div className="order-0 md:order-0">
            <h2 className="text-4xl md:text-5xl font-black text-[#2d2d2f] mb-6">
              Fully Customizable & Embeddable
            </h2>
            <p className="text-lg md:text-xl text-[#2d2d2f]/70 leading-relaxed">
              Add your onboarding widget to any website in seconds with a tiny 
              script. Style it, animate it, and control every step directly 
              from your dashboard.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[#2d2d2f] mb-6">
              Analytics That Actually Help
            </h2>
            <p className="text-lg md:text-xl text-[#2d2d2f]/70 leading-relaxed">
              Track completions, skipped steps, engagement, and improvements — 
              giving you instant clarity on what users struggle with.
            </p>
          </div>

          <div className="w-full">
            <img
              src="/images/Analytics.png"
              alt="Feature image"
              className="w-full h-auto rounded-xl shadow-xl object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}