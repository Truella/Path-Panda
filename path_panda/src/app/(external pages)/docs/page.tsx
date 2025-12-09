"use client"
export default function DocsPage() {
  const docs = [
    { title: "Getting Started", desc: "Quick setup guide to start using PathPanda." },
    { title: "Features Guide", desc: "Learn about the tools and features available." },
    { title: "API Reference", desc: "Detailed API documentation for developers." },
    { title: "FAQ", desc: "Frequently asked questions and answers." },
  ]

  return (
    <div className="bg-[#f7f7f7] min-h-screen flex flex-col">
    

      {/* Hero / Banner */}
      <section className="bg-[#f9f7fe] py-20 text-center">
        <h1 className="text-5xl font-bold text-[#2d2d2f]">Documentation</h1>
        <p className="mt-4 text-[#2d2d2f]/80 max-w-2xl mx-auto text-lg sm:text-xl">
          Explore PathPanda’s guides, tutorials, and references to get started quickly.
        </p>
      </section>

      {/* Docs Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <div
            key={doc.title}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#e0dce8]"
          >
            <h2 className="text-2xl font-semibold text-[#2d2d2f]">{doc.title}</h2>
            <p className="mt-3 text-[#2d2d2f]/80">{doc.desc}</p>
          </div>
        ))}
      </section>

    </div>
  )
}
