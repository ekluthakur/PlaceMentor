import React from "react";
import { useState } from "react";

export default function AIMentor() {

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi 👋 I'm your AI Mentor. Ask me anything about interviews, skills, or resumes!" }
  ])
  const [input, setInput] = useState("")

  const sendMessage = () => {

    if (!input.trim()) return

    const userMessage = { sender: "user", text: input }

   let aiResponse = "I'm here to help with interview preparation!"

const text = input.toLowerCase()

if (text.includes("resume")) {
aiResponse =
"Your resume should include: strong project descriptions, measurable achievements, and relevant technical skills."
}

else if (text.includes("react")) {
aiResponse =
"Important React topics: Hooks, Virtual DOM, State management, useEffect, and performance optimization."
}

else if (text.includes("interview")) {
aiResponse =
"Top interview tips: Practice mock interviews, explain your thinking clearly, and always give project examples."
}

else if (text.includes("hr")) {
aiResponse =
"In HR interviews, focus on communication, teamwork, leadership experiences, and your career goals."
}

else if (text.includes("javascript")) {
aiResponse =
"Important JS topics: closures, promises, async/await, event loop, and DOM manipulation."
}

    else if (text.includes("question")) {
aiResponse =
"Example interview question: Explain the difference between == and === in JavaScript."
}

    else if (text.includes("analyze resume")) {
aiResponse =
"Resume analysis tip: Check for clear project impact, proper formatting, and remove unnecessary personal details."
}


    const aiMessage = { sender: "ai", text: aiResponse }

    setMessages([...messages, userMessage, aiMessage])
    setInput("")
  }

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        🤖
      </button>


      {/* Chat Window */}

      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-xl flex flex-col">

          <div className="bg-blue-600 text-white p-3 rounded-t-xl">
            AI Mentor
          </div>

          <div className="flex flex-wrap gap-2 p-2 border-b">

            <button
              onClick={() => setInput("Give me interview tips")}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              Interview Tips
            </button>

            <button
              onClick={() => setInput("Help me improve my resume")}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              Resume Help
            </button>

            <button
              onClick={() => setInput("Common React interview questions")}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              React Questions
            </button>

            <button
              onClick={() => setInput("HR interview tips")}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              HR Round
            </button>

          </div>


          <div className="p-3 h-64 overflow-y-auto">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >

                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>

              </div>

            ))}

          </div>


          <div className="flex border-t">

            <input
              type="text"
              placeholder="Ask something..."
              className="flex-1 p-2 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
    </>
  )
}
