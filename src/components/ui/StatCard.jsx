import React from "react";

export default function StatCard({ title, value }) {

  return (

    <div
      className="
      bg-white
      shadow-lg
      rounded-xl
      p-5
      hover:shadow-xl
      transition
      "
    >

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-1">
        {value}
      </h2>

    </div>

  )
}