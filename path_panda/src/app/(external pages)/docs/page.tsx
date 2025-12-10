'use client';


export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-12">
        <h1 className="text-5xl font-bold text-[#2d2d2f]">Documentation</h1>
        <p className="mt-4 text-[#2d2d2f]/80 text-lg sm:text-xl">
          Welcome to PathPanda! <br/>
          The video below is a guide on how our site functions and will help you get started with integrating and using our product tour solution.
        </p>
      </section>

      {/* YouTube Video Embed */}
      <section className="mb-12">
        <div className="relative w-full overflow-hidden rounded-lg shadow-xl" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/5QWTNa3kb84"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <div className="space-y-12">
        <p>Please use the navigation on the left to explore the different sections.</p>
      </div>
    </div>
  );
}

