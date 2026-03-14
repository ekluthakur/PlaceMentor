import React from "react";
import { useEffect, useState } from "react"

export default function PRSCircle({ score = 70 }) {

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setProgress(score)
    }, 300)
  }, [score])

  const radius = 60
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (

    <div className="flex flex-col items-center">

      <svg width="150" height="150">

        <circle
          cx="75"
          cy="75"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />

        <circle
          cx="75"
          cy="75"
          r={radius}
          stroke="#3b82f6"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />

      </svg>

      <div className="-mt-24 text-3xl font-bold text-gray-800">
        {progress}
      </div>

      <p className="text-gray-500 text-sm">
        PRS Score
      </p>

    </div>

  )
}