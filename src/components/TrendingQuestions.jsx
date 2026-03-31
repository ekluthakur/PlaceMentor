import React, { useEffect, useState } from "react"
import axios from "axios"

export default function TrendingQuestions() {

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/interview/questions")
      .then(res => {
        console.log("API DATA:", res.data)
        setQuestions(res.data)
      })
      .catch(err => console.error("API ERROR:", err))
  }, [])

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-bold mb-4">
        Trending Interview Questions
      </h2>

      <div className="space-y-3">
        {questions.length === 0 ? (
          <p>Loading questions...</p>
        ) : (
          questions.map((q, i) => (
            <div key={i} className="border p-3 rounded-lg">
              <p className="font-semibold">
                {q.company} — {q.role}
              </p>

              <p className="text-gray-600 text-sm">
                {q.question}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}