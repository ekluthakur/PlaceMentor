import React from "react";
export default function SectionTitle({ title }) {
  return (
    <div className="flex items-center justify-between mb-6">

      <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
        {title}
      </h2>

      <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-500 to-transparent ml-4 rounded"></div>

    </div>
  )
}