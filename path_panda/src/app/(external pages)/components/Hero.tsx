export default function Hero() {
  return (
    <section className="bg-[#f9f7fe] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-[#2d2d2f] sm:text-6xl">
          Welcome to PathPanda
        </h1>
        <p className="mt-4 text-lg text-[#2d2d2f]/80 sm:text-xl">
          Show, don't tell. Build interactive tours that users actually complete!
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/get-started"
            className="bg-[#7a5e46] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6a4e36] hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Get Started
          </a>
          <a
            href="/docs"
            className="border border-[#7a5e46] text-[#7a5e46] px-6 py-3 rounded-lg font-medium hover:bg-[#7a5e46]/10 transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
