import React, { useState, useEffect, useRef } from "react"

export default function AIMentorChatbot() {

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi 👋 I'm your AI Mentor. Ask me about interviews, resumes, or skills!" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const chatRef = useRef()

  const user = JSON.parse(localStorage.getItem("userProfile")) || {}

  /* ---------------- CLOSE ON OUTSIDE CLICK ---------------- */

  useEffect(() => {
    function handleClickOutside(e) {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  /* ---------------- SEND MESSAGE ---------------- */

  const sendMessage = async () => {

    if (!input.trim()) return

    const userMsg = { role: "user", text: input }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
        const prs = localStorage.getItem("prs") || 50
      const res = await fetch("http://localhost:5000/api/ai/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        role: `
        User PRS: ${prs}

        User question: ${input}

       Give personalized advice based on PRS.
       Low PRS → basic guidance
       High PRS → advanced tips
      `
  })
      })

      const data = await res.json()

      const aiReply = {
        role: "ai",
        text: data.reply || "I can help you with interview prep!"
      }

      setMessages(prev => [...prev, aiReply])

    } catch (err) {

      setMessages(prev => [
        ...prev,
        { role: "ai", text: "AI not available right now." }
      ])
    }

    setLoading(false)
    setInput("")
  }

  return (

    <div>

      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-[9999]"
      >
        🤖
      </button>

      {open && (

        <div
          ref={chatRef}
          className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-2xl flex flex-col z-[9999]"
        >

          {/* HEADER */}

          <div className="bg-blue-600 text-white p-3 rounded-t-xl flex justify-between items-center">

            <span>AI Mentor</span>

            {/* ❌ CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="text-white text-lg font-bold hover:text-gray-200"
            >
              ✕
            </button>

          </div>

          {/* QUICK ACTIONS */}

          <div className="flex flex-wrap gap-2 p-2 border-b">

            <button
              onClick={() => setInput(`How can I improve my ${user.role || "skills"}?`)}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              Improve Skills
            </button>

            <button
              onClick={() => setInput("Give me interview tips")}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              Interview Tips
            </button>

            <button
              onClick={() => setInput("How to improve my resume?")}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              Resume Help
            </button>

          </div>

          {/* CHAT */}

          <div className="p-3 h-64 overflow-y-auto space-y-2">

            {messages.map((msg, i) => (

              <div
                key={i}
                className={`p-2 rounded-lg text-sm ${
                  msg.role === "ai"
                    ? "bg-gray-200 text-left"
                    : "bg-blue-100 text-right"
                }`}
              >
                {msg.text}
              </div>

            ))}

            {loading && (
              <p className="text-sm text-gray-400">Typing...</p>
            )}

          </div>

          {/* INPUT */}

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