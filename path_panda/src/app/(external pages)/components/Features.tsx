export default function Features() {
  const features = [
    {
      title: "Fast Setup",
      description: "Get started in minutes with our intuitive onboarding process.",
    },
    {
      title: "Secure & Reliable",
      description: "Your data is safe with enterprise-grade security protocols.",
    },
    {
      title: "Real-Time Updates",
      description: "Stay informed with instant notifications and dashboard insights.",
    },
    {
      title: "Flexible & Scalable",
      description: "Grow seamlessly with our platform as your needs evolve.",
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-[#2d2d2f]">Features</h2>
        <p className="mt-4 text-[#2d2d2f]/80">
          Explore what makes PathPanda the perfect solution for your needs.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#f9f7fe] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-[#2d2d2f]">{feature.title}</h3>
              <p className="mt-2 text-[#2d2d2f]/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
