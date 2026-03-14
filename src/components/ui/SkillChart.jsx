import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function SkillChart() {

  const data = [
    { skill: "DSA", score: 70 },
    { skill: "React", score: 85 },
    { skill: "System Design", score: 55 },
    { skill: "Communication", score: 75 }
  ]

  return (

    <ResponsiveContainer width="100%" height={250}>

      <BarChart data={data}>

        <XAxis dataKey="skill" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="score"
          fill="#6366f1"
          radius={[8,8,0,0]}
        />

      </BarChart>

    </ResponsiveContainer>

  )
}