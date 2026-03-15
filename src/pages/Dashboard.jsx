import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import GlassCard from "../components/cards/GlassCard"
import SectionTitle from "../components/ui/SectionTitle"
import TrendingQuestions from "../components/TrendingQuestions"
import JobIntelligence from "../components/JobIntelligence"
import HiringTracker from "../components/HiringTracker"
import { getUser } from "../services/userServices"

export default function Dashboard(){

const navigate = useNavigate()

const [user,setUser] = useState({})
const [prs,setPRS] = useState(0)

/* Load user */

useEffect(()=>{

const savedUser =
JSON.parse(localStorage.getItem("userProfile") || "{}")

setUser(savedUser)

setPRS(savedUser.prs || 72)

},[])


/* AI Suggested Interviews */

const role = user?.role || "Frontend Developer"

const suggestions = {

"Frontend Developer":[
"React Interview",
"JavaScript Deep Dive",
"Frontend System Design"
],

"Backend Developer":[
"NodeJS Interview",
"Database Design",
"API Architecture"
],

"AI Engineer":[
"Machine Learning Concepts",
"Deep Learning Basics",
"Python AI Interview"
]

}

const recommended = suggestions[role] || suggestions["Frontend Developer"]

/* Global Trending Interviews */

const trending = [

{
company:"Amazon",
role:"SDE",
users:2143
},

{
company:"Google",
role:"Frontend Engineer",
users:1802
},

{
company:"Microsoft",
role:"Backend Developer",
users:1340
}

]

/* Skill Gap Detection */

const skillGap = {
missing:["System Design","Advanced React","Data Structures"],

courses:[
{
skill:"System Design",
course:"Scalable System Design Fundamentals"
},

{
skill:"Advanced React",
course:"React Performance Optimization"
},

{
skill:"Data Structures",
course:"DSA for Coding Interviews"
}
]
}

return(

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">

<h1 className="text-3xl font-bold mb-8">
Welcome {user.name || "User"}
</h1>


{/* PRS CARD */}

<div className="grid md:grid-cols-3 gap-6 mb-10">

<GlassCard>

<SectionTitle
title="Placement Readiness Score"
subtitle="Your AI evaluated readiness"
/>

<div className="text-5xl font-bold text-purple-600 mt-4">
{prs}
</div>

<p className="text-gray-500 mt-2">
Your overall placement readiness
</p>

</GlassCard>


<GlassCard>

<SectionTitle title="Interviews Completed"/>

<div className="text-5xl font-bold text-blue-600 mt-4">
{user.interviews || 12}
</div>

</GlassCard>


<GlassCard>

<SectionTitle title="Resume Score"/>

<div className="text-5xl font-bold text-green-600 mt-4">
{user.resumeScore || 78}
</div>

</GlassCard>

</div>

{/* SKILL GAP DETECTION */}

<GlassCard className="mt-6">

<SectionTitle
title="Skill Gap Detection"
subtitle="AI detected areas to improve for your target role"
/>

<div className="grid md:grid-cols-2 gap-6 mt-6">

{/* Missing Skills */}

<div>

<h3 className="font-semibold mb-3 text-red-500">
Missing Skills
</h3>

<ul className="space-y-2">

{skillGap.missing.map((skill,i)=>(

<li
key={i}
className="bg-red-50 border border-red-200 px-3 py-2 rounded-lg"
>
{skill}
</li>

))}

</ul>

</div>


{/* Suggested Courses */}

<div>

<h3 className="font-semibold mb-3 text-green-600">
Suggested Learning Path
</h3>

<div className="space-y-3">

{skillGap.courses.map((c,i)=>(

<div
key={i}
className="border p-3 rounded-lg hover:shadow cursor-pointer"
>

<p className="font-semibold">
{c.skill}
</p>

<p className="text-sm text-gray-500">
{c.course}
</p>

</div>

))}

</div>

</div>

</div>

</GlassCard>

{/* AI RECOMMENDATIONS */}
<div className="mt-8">

<GlassCard className="mt-6">

<SectionTitle title="AI Recommended Interviews"/>

<div className="grid md:grid-cols-3 gap-4 mt-6">

{recommended.map((item,i)=>(

<div
key={i}
className="bg-white p-4 rounded-lg border hover:shadow cursor-pointer"
onClick={()=>navigate("/interview-setup",{state:{topic:item}})}
>

<h3 className="font-semibold">{item}</h3>

<p className="text-sm text-gray-500">
Recommended for {role}
</p>

</div>

))}

</div>

</GlassCard>
</div>


{/* TRENDING INTERVIEWS */}
<div className="mt-8">

<GlassCard className="">

<SectionTitle title="Trending Interviews Globally"/>

<div className="space-y-4 mt-6">

{trending.map((t,i)=>(

<div
key={i}
className="flex justify-between border-b pb-3"
>

<div>

<h3 className="font-semibold">
{t.company}
</h3>

<p className="text-gray-500 text-sm">
Role: {t.role}
</p>

</div>

<div className="text-right">

<p className="text-purple-600 font-bold">
{t.users}
</p>

<p className="text-gray-500 text-sm">
users practiced
</p>

</div>

</div>

))}

</div>

</GlassCard>
</div>

{/* Realtime Global actions */}

<div className="grid md:grid-cols-3 gap-6 mt-10">
<TrendingQuestions/>
<JobIntelligence/>
<HiringTracker/>
</div>

{/* QUICK ACTIONS */}

<div className="flex fle-wrap gap-4 mt-10">

<button
onClick={()=>navigate("/interview-setup")}
className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
>
Start Interview
</button>

<button
onClick={()=>navigate("/analytics")}
className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
>
View Analytics
</button>

<button
onClick={()=>navigate("/profile")}
className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
>
Open Profile
</button>

</div>

</div>

)

}