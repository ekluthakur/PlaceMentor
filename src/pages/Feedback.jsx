import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlassCard from "../components/cards/GlassCard";
import SectionTitle from "../components/ui/SectionTitle";

export default function Feedback() {

const navigate = useNavigate()
const location = useLocation()

/* --------------------------------
Data From Interview Page
-------------------------------- */

const data = location.state || {}

const questionsAnswered = data.questionsAnswered || 0
const totalQuestions = data.totalQuestions || 5
const answerLength = data.answerLength || 0

/* --------------------------------
Score Calculations
-------------------------------- */

const completionScore =
Math.round((questionsAnswered / totalQuestions) * 40)

const answerScore =
Math.min(Math.round(answerLength / 5), 40)

const confidenceScore = 10
const communicationScore = 10

const overallScore =
completionScore +
answerScore +
confidenceScore +
communicationScore

/* --------------------------------
PRS Calculation
-------------------------------- */

const prsScore = Math.min(overallScore, 100)

/* --------------------------------
Placement Status
-------------------------------- */

let status = "KEEP PRACTICING"
let color = "text-red-500"

if (prsScore >= 70) {
status = "READY FOR PLACEMENT"
color = "text-green-500"
}
else if (prsScore >= 40) {
status = "NEEDS IMPROVEMENT"
color = "text-yellow-500"
}

/* --------------------------------
Dynamic Strengths & Improvements
-------------------------------- */

const strengths = []

if(answerScore > 25){
strengths.push("Good answer clarity")
}

if(completionScore > 25){
strengths.push("Completed most interview questions")
}

if(prsScore > 60){
strengths.push("Strong communication and confidence")
}

if(strengths.length === 0){
strengths.push("Attempted interview successfully")
}

const improvements = []

if(answerScore < 20){
improvements.push("Improve explanation depth")
}

if(completionScore < 25){
improvements.push("Try completing more questions")
}

if(prsScore < 50){
improvements.push("Practice mock interviews regularly")
}

if(improvements.length === 0){
improvements.push("Focus on advanced interview questions")
}

/* --------------------------------
Dynamic Question Breakdown
-------------------------------- */

const [questions,setQuestions] = useState([])

useEffect(()=>{

const generatedQuestions = Array.from({length:questionsAnswered}).map((_,i)=>({

q:`Interview Question ${i+1}`,
score: Math.floor(Math.random()*30)+70,
feedback:"Answer was good but could include more technical depth."

}))

setQuestions(generatedQuestions)

},[questionsAnswered])

/* --------------------------------
Interview Result Object
(READY FOR BACKEND)
-------------------------------- */

const interviewResult = {

date: new Date().toISOString(),

scores:{
completion: completionScore,
answerQuality: answerScore,
confidence: confidenceScore,
communication: communicationScore,
overall: overallScore,
prs: prsScore
},

questions: questions

}

/*--------------------------------
Save Result to Local Storage
--------------------------------*/
const history =
JSON.parse(localStorage.getItem("interviewHistory")) || []

history.push({

topic:data.topic || "React Interview",
company:data.company || "Practice",
score:overallScore,
date:new Date().toLocaleDateString()

})

localStorage.setItem(
"interviewHistory",
JSON.stringify(history)
)

/* --------------------------------
Simulate Backend Storage
-------------------------------- */

useEffect(()=>{

const history =
JSON.parse(localStorage.getItem("interviewHistory")) || []

history.push(interviewResult)

localStorage.setItem(
"interviewHistory",
JSON.stringify(history)
)

},[])

/* --------------------------------
UI
-------------------------------- */

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10">

<div className="p-8 space-y-6">

<h1 className="text-3xl font-bold mb-6">
Interview Feedback
</h1>

{/* Score Cards */}

<div className="grid md:grid-cols-2 gap-6">

<GlassCard>

<h2 className="text-xl font-semibold mb-4">
Overall Performance Score
</h2>

<div className="text-5xl font-bold text-blue-600">
{overallScore} / 100
</div>

<p className="text-gray-600 mt-2">
Based on answers, completion and communication
</p>

</GlassCard>

<GlassCard>

<h2 className="text-xl font-semibold mb-4">
Placement Readiness Score (PRS)
</h2>

<div className="text-5xl font-bold text-purple-600">
{prsScore}
</div>

<p className={`mt-2 font-semibold ${color}`}>
{status}
</p>

<p className="text-gray-500 text-sm mt-2">
This PRS will be added to your overall placement readiness score.
</p>

</GlassCard>

</div>

<div className="grid md:grid-cols-2 gap-6 mt-6">

{/* Strengths */}

<GlassCard className="mt-8">

<SectionTitle title="Strengths" />

<ul className="space-y-2 mt-4">

{strengths.map((s,i)=>(

<li key={i} className="text-green-700">
✓ {s}
</li>

))}

</ul>

</GlassCard>

{/* Improvements */}

<GlassCard className="mt-6">

<SectionTitle title="Areas for Improvement" />

<ul className="space-y-2 mt-4">

{improvements.map((s,i)=>(

<li key={i} className="text-red-600">
⚠ {s}
</li>

))}

</ul>

</GlassCard>

</div>

{/* Question Breakdown */}
<div className="mt-10">

<GlassCard className=" py-4">

<SectionTitle title="Question Breakdown" />

<div className="space-y-4 mt-6">

{questions.map((q,i)=>(

<div
key={i}
className="bg-white/60 backdrop-blur rounded-lg p-4 border"
>

<p className="font-semibold">
{q.q}
</p>

<p className="text-sm text-gray-500 mt-1">
{q.feedback}
</p>

<div className="flex justify-between mt-2">

<span className="text-gray-600 text-sm">
Score
</span>

<span className="font-semibold text-blue-600">
{q.score}%
</span>

</div>

</div>

))}

</div>

</GlassCard>
</div>


{/* Action Buttons */}

<div className="flex gap-4 mt-10">

<button
onClick={()=>navigate("/")}
className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
>
Go To Dashboard
</button>

<button
onClick={()=>navigate("/interview-setup")}
className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
>
Practice Again
</button>

<button
onClick={()=>navigate("/analytics")}
className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
>
View Analytics
</button>

</div>

</div>

</div>
)

}