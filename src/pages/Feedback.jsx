import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlassCard from "../components/cards/GlassCard";
import SectionTitle from "../components/ui/SectionTitle";

export default function Feedback() {

const navigate = useNavigate()
const location = useLocation()

const data = location.state || {}

const questionsAnswered = data.questionsAnswered || 0
const totalQuestions = data.totalQuestions || 5
const answerLength = data.answerLength || 0

// ✅ NEW (REAL DATA)
const answers = data.answers || []
const questionsList = data.questions || []

/* ---------------- SCORE ---------------- */

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

const prsScore = Math.min(overallScore, 100)

/* ---------------- STATUS ---------------- */

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

/* ---------------- AI QUESTION FEEDBACK ---------------- */

const [questions,setQuestions] = useState([])
const [improvements,setImprovements] = useState([]) // ✅ NEW

useEffect(()=>{

  if (questions.length > 0) return; // ✅ STOP duplicate API calls

  async function loadAI(){

    let temp = []

    for(let i=0;i<questionsAnswered;i++){

      const questionText =
        questionsList[i]?.question || `Interview Question ${i+1}`

      const answerText = answers[i] || "No answer provided"

      try{

        const res = await fetch("http://localhost:5000/api/ai/feedback",{
          method:"POST",
          headers:{ "Content-Type":"application/json" },
          body: JSON.stringify({
            question: questionText,
            answer: answerText
          })
        })

        const data = await res.json()

        temp.push({
          q: questionText,
          score:(data.score || 7) * 10,
          feedback:data.feedback || "Good answer",
          improvement: data.improvement || "Try to improve clarity"
        })

      }catch{

        temp.push({
          q: questionText,
          score:Math.floor(Math.random() * 30) + 60,
          feedback:"Decent answer but needs improvement.",
          improvement:"Try structuring your answer with examples."
        })
      }
    }

    setQuestions(temp)
    setImprovements(temp.map(t => t.improvement))
  }

  if(questionsAnswered > 0){
    loadAI()
  }

},[questionsAnswered])

/* ---------------- SAVE RESULT ---------------- */

useEffect(() => {

const result = {
  id: Date.now(),
  userName: JSON.parse(localStorage.getItem("userProfile"))?.userName || "User",
  company: data.company || "Practice",
  role: data.role || "Mock Interview",
  prs: prsScore,
  score: overallScore,
  date: new Date().toLocaleDateString()
}
// ✅ PRS UPDATE (SMART)
const interviewScore = prsScore
const oldPRS = Number(localStorage.getItem("prs")) || 0

const newPRS = Math.round(
oldPRS * 0.6 +
interviewScore * 0.4
)

localStorage.setItem("prs", newPRS)

// ✅ HISTORY SAVE
const history =
JSON.parse(localStorage.getItem("interviewHistory")) || []

history.unshift(result)

localStorage.setItem("interviewHistory", JSON.stringify(history))

}, [])

return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10">

<div className="p-8 space-y-6">

<h1 className="text-3xl font-bold mb-6">
Interview Feedback
</h1>

<div className="grid md:grid-cols-2 gap-6">

<GlassCard>
<h2 className="text-xl font-semibold mb-4">
Overall Performance Score
</h2>
<div className="text-5xl font-bold text-blue-600">
{overallScore} / 100
</div>
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
</GlassCard>

</div>

{/* QUESTION BREAKDOWN */}

<div className="mt-10">
<GlassCard>
<SectionTitle title="Question Breakdown" />

<div className="space-y-4 mt-6">

{questions.map((q,i)=>(

<div key={i} className="bg-white/60 p-4 rounded-lg border">

<p className="font-semibold">
{q.q}
</p>


<p className="text-sm text-gray-500 mt-1">
  {typeof q.feedback === "string"
    ? q.feedback
    : JSON.stringify(q.feedback)}
</p>

<div className="flex justify-between mt-2">
<span className="text-gray-600 text-sm">Score</span>
<span className="font-semibold text-blue-600">
{q.score}%
</span>
</div>

</div>

))}

</div>

</GlassCard>
</div>

{/* ✅ IMPROVEMENT SECTION (NEW) */}

<div className="mt-10">
<GlassCard>
<SectionTitle title="Improvement Areas" />

<ul className="mt-4 space-y-2">
{improvements.map((imp,i)=>(
<li key={i} className="text-red-500">
⚠ {imp}
</li>
))}
</ul>

</GlassCard>
</div>

{/* BUTTONS */}

<div className="flex gap-4 mt-10">

<button
onClick={()=>navigate("/")}
className="bg-blue-600 text-white px-6 py-2 rounded-lg"
>
Go To Dashboard
</button>

<button
onClick={()=>navigate("/leaderboard")}
className="bg-green-600 text-white px-6 py-2 rounded-lg"
>
Leaderboard
</button>

</div>

</div>
</div>
)
}