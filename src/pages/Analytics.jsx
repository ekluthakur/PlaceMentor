import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import GlassCard from "../components/cards/GlassCard"
import SectionTitle from "../components/ui/SectionTitle"

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid,
BarChart,
Bar
} from "recharts"

export default function Analytics(){

const navigate = useNavigate()

const [history,setHistory] = useState([])

/* --------------------------------
Load Interview History
-------------------------------- */

useEffect(()=>{

const data =
JSON.parse(localStorage.getItem("interviewHistory")) || []

setHistory(data)

},[])

/* --------------------------------
Prepare Chart Data
-------------------------------- */

const chartData = history.map((h,i)=>({
name:`Interview ${i+1}`,
PRS:h?.scores?.prs || 0,
Performance:h?.scores?.overall || 0
}))

/* --------------------------------
Skill Progress (Simulated)
-------------------------------- */

const skills = [
{skill:"React",progress:80},
{skill:"JavaScript",progress:75},
{skill:"DSA",progress:60},
{skill:"System Design",progress:40}
]

/* --------------------------------
Average PRS
-------------------------------- */

const avgPRS = history.length === 0 ? 0 : Math.round(
history.reduce((a,b)=>a + (b?.scores?.prs || 0),0) / history.length
)

return(

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">

<h1 className="text-3xl font-bold mb-6">
Analytics Dashboard
</h1>

{/* PRS Summary Card*/}

<div className="grid md:grid-cols-3 gap-6">

<GlassCard>

<p className="text-gray-500">
Total Interviews
</p>

<p className="text-3xl font-bold">
{history.length}
</p>

</GlassCard>

<GlassCard>

<p className="text-gray-500">
Average PRS
</p>

<p className="text-3xl font-bold text-purple-600">
{avgPRS}
</p>

</GlassCard>

<GlassCard>

<p className="text-gray-500">
Best Score
</p>

<p className="text-3xl font-bold text-green-600">
{history.length
? Math.max(...history.map(h=>h?.scores?.prs || 0))
:0}
</p>

</GlassCard>

</div>


{/* Performance Chart */}
<div className="mt-8">

<GlassCard className="mt-8">

<SectionTitle title="Interview Performance Trend" />

<div className="mt-6 h-64">

<ResponsiveContainer width="100%" height={280}>

<LineChart data={chartData}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="PRS"
stroke="#6366f1"
strokeWidth={3}
/>

<Line
type="monotone"
dataKey="Performance"
stroke="#10b981"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

</GlassCard>
</div>

{/* Skill Progress */}
<div className="mt-8">
<GlassCard className="mt-8">

<SectionTitle title="Skill Progress" />

<div className="mt-6 space-y-4">

{skills.map((s,i)=>(

<div key={i}>

<div className="flex justify-between">

<span>{s.skill}</span>

<span>{s.progress}%</span>

</div>

<div className="w-full bg-gray-200 rounded-full h-3 mt-1">

<div
className="bg-blue-600 h-3 rounded-full transition-all duration-700"
style={{width:`${s.progress}%`}}
/>

</div>

</div>

))}

</div>
</GlassCard>
</div>


{/* PRS Distribution */}
<div className = "mt-8">
<GlassCard className="mt-8">

<SectionTitle title="PRS Distribution" />

<div className="mt-6 h-64">

<ResponsiveContainer width="100%" height={280}>

<BarChart data={chartData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="PRS"
fill="#8b5cf6"
/>

</BarChart>

</ResponsiveContainer>

</div>

</GlassCard>
</div>

{/* Interview History */}
<div className = "mt-8">
<GlassCard className="mt-8">

<SectionTitle title="Interview History" />

<table className="w-full mt-6">

<thead>

<tr className="text-left border-b">

<th className="py-2">Interview</th>

<th>PRS</th>

<th>Performance</th>

<th>Date</th>

</tr>

</thead>

<tbody>

{history.map((h,i)=>(

<tr key={i} className="border-b">

<td className="py-2">
Interview {i+1}
</td>

<td className="text-purple-600 font-semibold">
{h?.scores?.prs || 0}
</td>

<td>
{h?.scores?.overall || 0}
</td>

<td className="text-gray-500">
{h?.date ? new Date(h.date).toLocaleDateString() : "-"}
</td>

</tr>

))}

</tbody>

</table>

</GlassCard>
</div>

{/* Navigation Buttons */}

<div className="flex gap-4 mt-10">

<button
onClick={()=>navigate("/")}
className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
>
Dashboard
</button>

<button
onClick={()=>navigate("/interview-setup")}
className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
>
Start Interview
</button>

<button
onClick={()=>navigate("/resume-upload")}
className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
>
Resume Analyzer
</button>

</div>
</div>
)

}
