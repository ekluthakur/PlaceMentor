import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import GlassCard from "../components/cards/GlassCard"
import SectionTitle from "../components/ui/SectionTitle"

export default function InterviewSetup() {

  const navigate = useNavigate()

  const [role, setRole] = useState("Frontend Developer")
  const [company, setCompany] = useState("Google")
  const [difficulty, setDifficulty] = useState("Medium")
  const [questions, setQuestions] = useState(5)

  const companies = [
    {name:"Google", logo:"🟢"},
    {name:"Amazon", logo:"🟠"},
    {name:"Microsoft", logo:"🔵"},
    {name:"Meta", logo:"🟣"},
    {name:"TCS", logo:"🔷"},
    {name:"Infosys", logo:"🟦"},
    {name:"Wipro", logo:"🟩"},
    {name:"Accenture", logo:"🟡"}
  ]

  const difficulties = ["Easy","Medium","Hard"]

  const startInterview = () => {
    navigate("/interview", {
      state:{
        role,
        company,
        difficulty,
        questions
      }
    })
  }

  const interviewDuration = questions * 3

  const prsBoost = difficulty === "Hard" ? 12 : difficulty === "Medium" ? 8 : 5

  return (

    <div className="space-y-10">

      <h1 className="text-3xl font-bold text-gray-800">
        Interview Setup
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT CONFIG PANEL */}

        <div className="lg:col-span-2 space-y-8">

          {/* Role */}

          <GlassCard>

            <SectionTitle title="Role" />

            <input
              type="text"
              value={role}
              onChange={(e)=>setRole(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />

          </GlassCard>

          {/* Company Selection */}

          <GlassCard>

            <SectionTitle title="Select Company" />

            <div className="grid md:grid-cols-4 gap-4 mt-4">

              {companies.map((c,i)=>(
                <div
                  key={i}
                  onClick={()=>setCompany(c.name)}
                  className={`cursor-pointer border rounded-lg p-4 text-center transition
                  ${company===c.name ? "bg-blue-500 text-white" : "hover:bg-blue-50"}`}
                >

                  <div className="text-2xl mb-1">
                    {c.logo}
                  </div>

                  <p className="text-sm font-medium">
                    {c.name}
                  </p>

                </div>
              ))}

            </div>

          </GlassCard>

          {/* Difficulty */}

          <GlassCard>

            <SectionTitle title="Difficulty Level" />

            <div className="flex gap-4 mt-4">

              {difficulties.map((d,i)=>(
                <button
                  key={i}
                  onClick={()=>setDifficulty(d)}
                  className={`px-6 py-2 rounded-lg font-medium transition
                  ${difficulty===d
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-blue-100"}`}
                >
                  {d}
                </button>
              ))}

            </div>

          </GlassCard>

          {/* Question Count */}

          <GlassCard>

            <SectionTitle title="Number of Questions" />

            <input
              type="range"
              min="3"
              max="10"
              value={questions}
              onChange={(e)=>setQuestions(Number(e.target.value))}
              className="w-full mt-4"
            />

            <p className="mt-2 text-gray-600">
              {questions} Questions
            </p>

          </GlassCard>

        </div>

        {/* RIGHT PREVIEW PANEL */}

        <GlassCard>

          <SectionTitle title="Interview Preview" />

          <div className="space-y-4 mt-4 text-sm">

            <div className="flex justify-between">
              <span>Role</span>
              <span className="font-semibold">{role}</span>
            </div>

            <div className="flex justify-between">
              <span>Company</span>
              <span className="font-semibold">{company}</span>
            </div>

            <div className="flex justify-between">
              <span>Difficulty</span>
              <span className="font-semibold">{difficulty}</span>
            </div>

            <div className="flex justify-between">
              <span>Questions</span>
              <span className="font-semibold">{questions}</span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Duration</span>
              <span className="font-semibold">
                {interviewDuration} min
              </span>
            </div>

            <div className="flex justify-between">
              <span>PRS Improvement</span>
              <span className="font-semibold text-green-600">
                +{prsBoost}%
              </span>
            </div>

          </div>

          <button
            onClick={startInterview}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Start Interview
          </button>

        </GlassCard>

      </div>

    </div>

  )

}