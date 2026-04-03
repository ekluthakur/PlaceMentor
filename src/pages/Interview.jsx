import React, { useState, useEffect, useRef } from "react"
import Webcam from "react-webcam"
import { fetchQuestions } from "../utils/questionEngine"
import { useNavigate } from "react-router-dom"
import GlassCard from "../components/cards/GlassCard"
import {useLocation } from "react-router-dom"

export default function Interview() {

  const navigate = useNavigate()
  const location = useLocation()

  const setup = location.state || {
  role: "Developer",
  company: "Company",
  difficulty: "Medium",
  questions: 5
}

  const videoRef = useRef(null)

  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [time, setTime] = useState(0)
  const [recording, setRecording] = useState(false)
  const [answer, setAnswer] = useState("")
  const [listening, setListening] = useState(false)
  const [aiSpeaking, setAISpeaking] = useState(false)
  // ✅ FETCH QUESTIONS FROM API
useEffect(() => {
  fetchQuestions().then(data => {
    console.log("QUESTIONS:", data)

    let filtered = data

    // ✅ APPLY FILTER ONLY IF score EXISTS
    if (data[0]?.score !== undefined) {
      filtered = data.filter(q => {
        if (setup.difficulty === "Easy") return q.score < 5
        if (setup.difficulty === "Medium") return q.score >= 5 && q.score < 15
        return q.score >= 15
      })
    }

    // ✅ FALLBACK
    if (filtered.length === 0) {
      filtered = data
    }

    const shuffled = filtered.sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, setup.questions)

    setQuestions(selected)
  })
}, [])

  // ✅ CAMERA ACCESS
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch((err) => {
        console.error("Camera permission denied:", err)
      })
  }, [])

  // ✅ TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // ✅ AI SPEAK FUNCTION
  const speakQuestion = (question) => {
    if (!question) return

    const speech = new SpeechSynthesisUtterance(question)
    speech.lang = "en-US"
    speech.rate = 0.9

    speech.onstart = () => setAiSpeaking(true)
    speech.onend = () => setAiSpeaking(false)

    const voices = window.speechSynthesis.getVoices()
    const femaleVoice = voices.find(v => v.name.includes("Female"))

    if (femaleVoice) speech.voice = femaleVoice

    window.speechSynthesis.speak(speech)
  }

  // ✅ INTRO + QUESTION SPEAK
  useEffect(() => {
    if (questions.length > 0) {

      const intro = new SpeechSynthesisUtterance(
        `Hello, I am your interviewer from ${setup.company}. Let's begin.`
      )

      window.speechSynthesis.speak(intro)

      setTimeout(() => {
        speakQuestion(questions[currentQuestion]?.question)
      }, 1500)
    }
  }, [questions])

  //Next Question
   const nextQuestion = async () => {
      // ❌ PREVENT EMPTY SUBMIT
  if (!questions.length) {
    alert("Questions not loaded yet")
    return
  }

  if (!answer.trim()) {
    alert("Please write or speak your answer first")
    return
  }

  await submitAnswer()   // ✅ SAVE ANSWER FIRST

  if (questions.length > 0 && currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1)
    setAnswer("")

    setTimeout(() => {
      speakQuestion(questions[currentQuestion + 1]?.question)
    },800)
  } else {
    finishInterview()
  }
}


  const finishInterview = () => {
    navigate("/feedback")
  }

  // ✅ VOICE INPUT
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = "en-US"

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript

      setAnswer((prev) => prev + " " + transcript)
    }

    recognition.start()
    setListening(true)
  }

  // Save Answer
const submitAnswer = async () => {
  try {
    const current = questions[currentQuestion]

    const res = await fetch("http://localhost:5000/api/interview/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        question: current?.question || "",
        answer: answer,
        feedback: "", // can improve later

        company: setup.company,
        role: setup.role,
        difficulty: setup.difficulty,

        // simple demo scoring (you can upgrade later)
        score: overallScore,
        prs: prsScore
      })
    })

    const data = await res.json()

    if (res.ok) {
      console.log("✅ Answer saved!", data)
    } else {
      console.error("❌ Failed:", data.message)
    }

  } catch (error) {
    console.error("Error saving answer:", error)
  }
}

  return (
    <div className="p-8 space-y-6">

      <h1 className="text-3xl font-bold">
        AI Interview Room
      </h1>

      {/* PANELS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* AI INTERVIEWER */}
        <GlassCard>
          <h2 className="font-semibold mb-4">
            AI Interviewer
          </h2>

          <div className="flex flex-col items-center justify-center h-64">
            <img
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${setup.company}`}
              alt="AI Interviewer"
              className={'w-32 h-32 ' + (aiSpeaking ? 'animate-pulse' : '')}
            />

            <p className="mt-3 text-gray-600 text-center">
              {questions[currentQuestion]?.question || "Loading..."}
            </p>

            {aiSpeaking && (
              <p className="text-blue-500 mt-2 animate-pulse">
                🤖 AI is speaking...
              </p>
            )}
          </div>
        </GlassCard>

        {/* USER CAMERA */}
        <GlassCard>
          <h2 className="font-semibold mb-4">
            Your Camera
          </h2>

          <Webcam
            audio={true}
            className="rounded-lg w-full"
          />

          <button
            onClick={() => setRecording(!recording)}
            className={`mt-4 px-4 py-2 rounded-lg text-white
            ${recording ? "bg-red-600" : "bg-green-600"}`}
          >
            {recording ? "Recording..." : "Start Answer"}
          </button>

          {recording && (
            <p className="text-red-500 mt-2 animate-pulse">
              🎤 Recording answer...
            </p>
          )}
        </GlassCard>

      </div>

      {/* TIMER */}
      <div className="text-right text-gray-600 font-semibold">
        Interview Time: {Math.floor(time / 60)}:
        {(time % 60).toString().padStart(2, "0")}
      </div>

      {/* QUESTION PANEL */}
      <GlassCard>


        {questions && questions.length > 0 ? (
          <>
            <p className="font-semibold">
               {setup.company} - {setup.role}
            </p>

            <p className="text-gray-700 text-lg mt-2">
              {questions[currentQuestion]?.question}
            </p>
          </>
        ) : (
         <p>⚠️ No questions found</p>
       )}
      </GlassCard>

      {/* ANSWER PANEL */}
      <GlassCard>


        <textarea
          rows="5"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border rounded-lg p-3 outline-none"
          placeholder="Explain your answer clearly..."
        />



        <button
          onClick={startListening}
          className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          🎤 Speak Answer
        </button>
      </GlassCard>

      {/* CONTROLS */}
      <div className="flex justify-end gap-4">

        <button
          onClick={nextQuestion}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Next Question
        </button>

        <button
          onClick={() => navigate("/feedback", {
            state: {
              answerLength: answer.length,
              questionsAnswered: currentQuestion + 1,
              totalQuestions: questions.length
            }
          })}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          End Interview
        </button>

      </div>

    </div>
  )
}