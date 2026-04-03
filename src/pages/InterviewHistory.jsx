import React, { useEffect, useState } from "react"
import { getInterviewHistory } from "../services/interviewService"

export default function InterviewHistory() {

  const [history, setHistory] = useState([])

  useEffect(() => {
    async function load() {
      const data = await getInterviewHistory()
      setHistory(data || [])
    }
    load()
  }, [])

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Interview History
      </h1>

      <div className="space-y-4">

        {history.length === 0 && (
          <p className="text-gray-500">No interviews yet</p>
        )}

        {history.map((h, i) => (

          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow flex justify-between"
          >

            <div>
              <p className="font-semibold">
                {h.question || "Interview Question"}
              </p>

              <p className="text-gray-500 text-sm">
                {new Date(h.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-blue-600 font-bold">
                PRS +{h.prs || 0}
              </p>
            </div>

          </div>

        ))}

      </div>

    </div>
  )
}