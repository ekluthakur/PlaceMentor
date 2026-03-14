import React,{useEffect,useState} from "react"
import {useNavigate} from "react-router-dom"
import GlassCard from "../components/ui/GlassCard"
import SectionTitle from "../components/ui/SectionTitle"

export default function InterviewHistory(){

const navigate = useNavigate()

const [history,setHistory] = useState([])

useEffect(()=>{

const saved =
JSON.parse(localStorage.getItem("interviewHistory")) || []

setHistory(saved)

},[])


return(

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">

<h1 className="text-3xl font-bold mb-8">
Interview History
</h1>


{history.length === 0 && (

<GlassCard>

No interviews completed yet.

</GlassCard>

)}



<div className="space-y-6">

{history.map((item,i)=>(

<GlassCard key={i}>

<div className="flex justify-between items-center">

<div>

<h3 className="font-semibold">
{item.topic}
</h3>

<p className="text-sm text-gray-500">
Company: {item.company}
</p>

</div>

<div className="text-right">

<p className="text-blue-600 font-bold">
Score {item.score}
</p>

<p className="text-gray-500 text-sm">
{item.date}
</p>

</div>

</div>

</GlassCard>

))}

</div>


<div className="mt-10">

<button
onClick={()=>navigate("/profile")}
className="bg-purple-600 text-white px-6 py-2 rounded-lg"
>
Back to Profile
</button>

</div>

</div>

)

}