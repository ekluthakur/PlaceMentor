import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"


const [questions, setQuestions] = useState([])

useEffect(() => {
  axios.get("http://localhost:5000/api/interview/questions")
    .then(res => setQuestions(res.data))
    .catch(err => console.error(err))
}, [])

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