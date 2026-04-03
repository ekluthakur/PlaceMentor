import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import GlassCard from "../components/cards/GlassCard"
import SectionTitle from "../components/ui/SectionTitle"

export default function ResumeAnalyzer(){

const location = useLocation()
const navigate = useNavigate()

/* ---------------- STATES ---------------- */

const [text,setText] = useState("")
const [skills,setSkills] = useState([])
const [resumeScore,setResumeScore] = useState(0)
const [atsScore,setATSScore] = useState(0)

/* ---------------- DEFAULT FALLBACK ---------------- */

const defaultSkills = ["React","JavaScript","Node.js"]

const requiredSkills = ["React","Node.js","MongoDB","DSA"]

const suggestions = [
"Add measurable achievements",
"Improve project descriptions",
"Include system design experience",
"Add GitHub links"
]

/* ---------------- AI + LOGIC ---------------- */

const analyzeResume = async ()=>{

if(!text || text.length < 50){
alert("Please paste a valid resume")
return
}

try{

const res = await fetch("http://localhost:5000/api/ai/skills",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ resumeText:text })
})

const data = await res.json()

/* ✅ NORMALIZE SKILLS (IMPORTANT FIX) */
const extractedSkills = (data.skills || []).map(s =>
s.toLowerCase()
)

setSkills(extractedSkills)

/* ✅ REQUIRED SKILLS LOWERCASE */
const required = ["react","node.js","mongodb","dsa"]

/* ✅ ATS SCORE FIX */
const matched = required.filter(skill =>
extractedSkills.includes(skill)
)

const ats = Math.round((matched.length / required.length) * 100)
setATSScore(ats)

/* ✅ RESUME SCORE FIX */
let score = 40

if(text.length > 300) score += 20
if(text.toLowerCase().includes("project")) score += 10
if(text.toLowerCase().includes("experience")) score += 10
if(extractedSkills.length > 3) score += 20

setResumeScore(Math.min(score,100))

}catch(err){
console.log(err)

/* fallback (IMPORTANT) */

}
}

/* ---------------- SKILL GAP ---------------- */

const missingSkills = ["react","node.js","mongodb","dsa"].filter(
skill => !skills.includes(skill)
)

/* ---------------- UI (UNCHANGED) ---------------- */

return(

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">

<h1 className="text-3xl font-bold mb-6">
Resume Analysis
</h1>


{/* SCORE CARDS */}

<div className="grid md:grid-cols-2 gap-6 mt-6">

<GlassCard>

<h2 className="text-lg font-semibold mb-4">
Resume Strength Score
</h2>

<div className="text-5xl font-bold text-blue-600">
{resumeScore}
</div>

<div className="mt-4 w-full bg-gray-200 rounded-full h-3">

<div
className="bg-blue-600 h-3 rounded-full transition-all duration-700"
style={{width:`${resumeScore}%`}}
/>

</div>

</GlassCard>

<GlassCard>

<h2 className="text-lg font-semibold mb-4">
ATS Compatibility
</h2>

<div className="text-5xl font-bold text-green-600">
{atsScore}
</div>

<div className="mt-4 w-full bg-gray-200 rounded-full h-3">

<div
className="bg-green-600 h-3 rounded-full transition-all duration-700"
style={{width:`${atsScore}%`}}
/>

</div>

</GlassCard>

</div>

{/* SKILLS */}

<div className="grid md:grid-cols-2 gap-6 mt-8">

<GlassCard>

<SectionTitle title="Detected Skills" />

<ul className="mt-4 space-y-2">

{(skills.length ? skills : defaultSkills).map((s,i)=>(
<li key={i} className="text-green-700">
✓ {s}
</li>
))}

</ul>

</GlassCard>

<GlassCard>

<SectionTitle title="Missing Skills" />

<ul className="mt-4 space-y-2">

{missingSkills.map((s,i)=>(
<li key={i} className="text-red-600">
⚠ {s}
</li>
))}

</ul>

</GlassCard>

</div>

{/* SUGGESTIONS */}
<div className="mt-4 w-full bg-gray-200 rounded-full h-3">
<GlassCard className="mt-8">

<SectionTitle title="Improvement Suggestions" />

<ul className="mt-4 space-y-2">

{suggestions.map((s,i)=>(
<li key={i} className="text-gray-700">
• {s}
</li>
))}

</ul>

</GlassCard>


{/* BUTTONS */}

<div className="flex gap-4 mt-10">

<button
onClick={()=>navigate("/")}
className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
>
Back To Dashboard
</button>

<button
onClick={()=>navigate("/resume-upload")}
className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
>
Upload Another Resume
</button>

</div>

</div>
</div>

)

}