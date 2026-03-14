import React from "react";
export default function SkillBar({ label, value }) {

  return (

    <div className="mb-5">

      <div className="flex justify-between mb-1">

        <span className="text-sm font-semibold">
          {label}
        </span>

        <span className="text-sm text-gray-600">
          {value}%
        </span>

      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">

        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-700"
          style={{ width: `${value}%` }}
        />

      </div>

    </div>

  )
}