import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import GlassCard from "../components/ui/GlassCard"
import SectionTitle from "../components/ui/SectionTitle"

export default function ResumeAnalyzer(){

const location = useLocation()
const navigate = useNavigate()

const data = location.state || {}

const resumeScore = 78
const atsScore = 82

const skills = [
"React",
"JavaScript",
"Node.js",
"MongoDB"
]

const missingSkills = [
"System Design",
"Redis",
"Testing"
]

const suggestions = [
"Add measurable achievements",
"Improve project descriptions",
"Include system design experience",
"Add GitHub links"
]

return(

<div className="">

<h1 className="text-3xl font-bold mb-6">
Resume Analysis
</h1>

{/* Score Cards */}

<div className="grid md:grid-cols-2 gap-6">

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

{/* Skills */}

<div className="grid md:grid-cols-2 gap-6 mt-8">

<GlassCard>

<SectionTitle title="Detected Skills" />

<ul className="mt-4 space-y-2">

{skills.map((s,i)=>(
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

{/* Suggestions */}
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


{/* Buttons */}


<div className="flex gap-4 mt-10">

<button
onClick={()=>navigate("/dashboard")}
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