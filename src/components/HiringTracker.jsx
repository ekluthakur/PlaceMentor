import React,{useEffect,useState} from "react"

export default function HiringTracker(){

const [companies,setCompanies] = useState([])

useEffect(()=>{

setCompanies([
{company:"Google",status:"Hiring"},
{company:"Amazon",status:"Hiring"},
{company:"Netflix",status:"Paused"},
{company:"Meta",status:"Hiring"}
])

},[])

return(

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="font-bold mb-4">
Realtime Hiring Tracker
</h2>

<div className="space-y-3">

{companies.map((c,i)=>(

<div key={i} className="flex justify-between border p-3 rounded">

<span>{c.company}</span>

<span
className={
c.status==="Hiring"
?"text-green-600"
:"text-red-500"
}
>
{c.status}
</span>

</div>

))}

</div>

</div>

)

}