import React from "react"

export default function Features() {

  const features = [
    {
      title: "AI Mock Interviews",
      desc: "Practice real interview questions with our AI powered mock interview system."
    },
    {
      title: "Resume Analyzer",
      desc: "Upload resume and get smart AI suggestions to improve recruiter chances."
    },
    {
      title: "Instant Feedback",
      desc: "Get detailed feedback on answers, communication and confidence."
    },
    {
      title: "Performance Analytics",
      desc: "Track interview progress and improve placement readiness."
    }
  ]

  return (
    <section id="features" className="mt-24 px-10 py-20 max-w-7xl mx-auto">

      <h2 className="text-4xl font-bold text-center mb-16">
        Powerful Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((feature, i) => (
          <div
            key={i}
            className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-4">
              {feature.title}
            </h3>

            <p className="text-gray-600 text-sm">
              {feature.desc}
            </p>
          </div>
        ))}

      </div>

    </section>
  )
}