import React from "react";
export default function GlassCard({ children }) {
  return (
    <div
      className=
      "bg-white/60 backdrop-blur-xl rounded-xl shadow-md p-6 transition hover:shadow-xl hover:-translate-y-1 duration-300">
      {children}
    </div>
  )
}