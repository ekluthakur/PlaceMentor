import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import GlassCard from "../components/cards/GlassCard"
import SectionTitle from "../components/ui/SectionTitle"

export default function ProfileAnalytics(){

const navigate = useNavigate()

const [analytics,setAnalytics] = useState({

totalInterviews:0,
avgScore:0,
bestScore:0,
weakArea:"System Design",
strongArea:"React"

})

useEffect(()=>{

const saved =
JSON.parse(localStorage.getItem("interviewHistory")) || []

if(saved.length > 0){

const scores = saved.map(i=>i.score)

const avg =
Math.round(scores.reduce((a,b)=>a+b,0)/scores.length)

const best = Math.max(...scores)

setAnalytics({

totalInterviews:saved.length,
avgScore:avg,
bestScore:best,
weakArea:"System Design",
strongArea:"React"

})

}

},[])


return(

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">

<h1 className="text-3xl font-bold mb-8">
Profile Analytics
</h1>


<div className="grid md:grid-cols-3 gap-6 mb-10">

<GlassCard>

<SectionTitle title="Total Interviews"/>

<div className="text-4xl font-bold text-purple-600 mt-4">
{analytics.totalInterviews}
</div>

</GlassCard>


<GlassCard>

<SectionTitle title="Average Score"/>

<div className="text-4xl font-bold text-blue-600 mt-4">
{analytics.avgScore}
</div>

</GlassCard>


<GlassCard>

<SectionTitle title="Best Score"/>

<div className="text-4xl font-bold text-green-600 mt-4">
{analytics.bestScore}
</div>

</GlassCard>

</div>



<div className="grid md:grid-cols-2 gap-6">

<GlassCard>

<SectionTitle title="Strong Area"/>

<p className="text-green-600 font-semibold mt-4">
{analytics.strongArea}
</p>

</GlassCard>


<GlassCard>

<SectionTitle title="Needs Improvement"/>

<p className="text-red-600 font-semibold mt-4">
{analytics.weakArea}
</p>

</GlassCard>

</div>


<div className="mt-10">

<button
onClick={()=>navigate("/profile")}
className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
>
Back to Profile
</button>

</div>

</div>

)

}