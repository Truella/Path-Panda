export default function HowItWorks() {
  const steps = [
    {
      title: "Sign Up",
      description: "Create an account quickly using your email or social login.",
    },
    {
      title: "Set Up Your Profile",
      description: "Add your details and preferences to customize your experience.",
    },
    {
      title: "Start Using PathPanda",
      description: "Access features, track your progress, and get updates in real-time.",
    },
  ]

  return (
    <section className="bg-[#f9f7fe] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-[#2d2d2f]">How It Works</h2>
        <p className="mt-4 text-[#2d2d2f]/80">
          Follow these simple steps to get started with PathPanda.
        </p>

        <div className="mt-12 flex flex-col md:flex-row justify-center gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex-1"
            >
              <div className="text-[#7a5e46] font-bold text-2xl mb-2">{index + 1}</div>
              <h3 className="text-xl font-semibold text-[#2d2d2f]">{step.title}</h3>
              <p className="mt-2 text-[#2d2d2f]/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
