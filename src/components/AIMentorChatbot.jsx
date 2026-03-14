import React from "react";
import { useState } from "react"

export default function AIMentorChatbot() {

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi 👋 I'm your AI Mentor. Ask me about interviews, resumes, or skills!" }
  ])

  const [input, setInput] = useState("")

  const sendMessage = () => {

    if (!input) return

    const newMessages = [
      ...messages,
      { role: "user", text: input }
    ]

    const reply = generateReply(input)

    setMessages([
      ...newMessages,
      { role: "ai", text: reply }
    ])

    setInput("")
  }

  const generateReply = (text) => {

    text = text.toLowerCase()

    if (text.includes("resume"))
      return "Tip: Keep your resume to 1 page and highlight measurable achievements."

    if (text.includes("interview"))
      return "Practice STAR method: Situation, Task, Action, Result."

    if (text.includes("skills"))
      return "Top skills for placements: DSA, React, System Design, Communication."

    return "Good question! Practice consistently and review your interview feedback."
  }

  return (

    <div>

      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50"
      >
        🤖
      </button>

      {open && (

        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-xl flex flex-col">

          <div className="bg-blue-600 text-white p-3 rounded-t-xl">
            AI Mentor
          </div>

          <div className="p-3 h-64 overflow-y-auto space-y-2">

            {messages.map((msg, i) => (

              <div
                key={i}
                className={`p-2 rounded-lg text-sm ${
                  msg.role === "ai"
                    ? "bg-gray-200"
                    : "bg-blue-100 text-right"
                }`}
              >
                {msg.text}
              </div>

            ))}

          </div>

          <div className="flex border-t">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 outline-none"
              placeholder="Ask anything..."
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4"
            >
              Send
            </button>

          </div>

        </div>

      )}

    </div>
  )
}