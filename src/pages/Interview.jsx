import React, { useState, useEffect, useRef } from "react"
import Webcam from "react-webcam"
import { fetchQuestions } from "../utils/questionEngine"
import { useNavigate } from "react-router-dom"
import GlassCard from "../components/cards/GlassCard"

export default function Interview() {

  const navigate = useNavigate()
  const videoRef = useRef(null)

  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [time, setTime] = useState(0)
  const [recording, setRecording] = useState(false)
  const [answer, setAnswer] = useState("")
  const [listening, setListening] = useState(false)

  // ✅ FETCH QUESTIONS FROM API
  useEffect(() => {
    fetchQuestions().then(data => {
      console.log("QUESTIONS:", data)
      setQuestions(data)
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

  // ✅ SPEAK QUESTION
  useEffect(() => {
    if (questions.length > 0) {
      speakQuestion(questions[currentQuestion]?.question)
    }
  }, [currentQuestion, questions])

  const speakQuestion = (question) => {
    if (!question) return
    const speech = new SpeechSynthesisUtterance(question)
    speech.lang = "en-US"
    window.speechSynthesis.speak(speech)
  }

   const nextQuestion = async () => {

  await submitAnswer()   // ✅ SAVE ANSWER FIRST

  if (questions.length > 0 && currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1)
    setAnswer("")
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

    const submitAnswer = async () => {
  try {
    const current = questions[currentQuestion]

    await fetch("http://localhost:5000/api/answers/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: current.question,
        company: current.company,
        role: current.role,
        answer: answer
      })
    })

      if (res.ok) {
        console.log("✅ Answer saved!")
      } else {
         console.error("❌ Failed to save answer")
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
              src="https://api.dicebear.com/7.x/bottts/svg?seed=mentor"
              alt="AI Interviewer"
              className="w-32 h-32"
            />

            <p className="mt-3 text-gray-600">
              Asking: {questions[currentQuestion]?.question || "Loading..."}
            </p>
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
        <h2 className="text-lg font-semibold mb-3">
          Interview Question
        </h2>

        {questions && questions.length > 0 ? (
          <>
            <p className="font-semibold">
                {questions[currentQuestion]?.company} — {questions[currentQuestion]?.role}
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
        <h2 className="text-lg font-semibold mb-3">
          Your Answer
        </h2>

        <textarea
          rows="5"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border rounded-lg p-3 outline-none"
          placeholder="Explain your answer clearly..."
        />

        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-1">
            Answer Quality
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${Math.min(answer.length * 2, 100)}%` }}
            />
          </div>
        </div>

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