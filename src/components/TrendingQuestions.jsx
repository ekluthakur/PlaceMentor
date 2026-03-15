import React from "react"
import { trendingQuestions } from "../data/trendingQuestions"

export default function TrendingQuestions(){

return(

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="font-bold mb-4">
Trending Interview Questions
</h2>

<div className="space-y-3">

{trendingQuestions.map((q,i)=>(

<div key={i} className="border p-3 rounded-lg">

<p className="font-semibold">
{q.company} — {q.role}
</p>

<p className="text-gray-600 text-sm">
{q.question}
</p>

</div>

))}

</div>

</div>

)

}