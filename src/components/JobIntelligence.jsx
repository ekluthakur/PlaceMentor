import React from "react"


useEffect(() => {
  axios.get("http://localhost:5000/api/jobs/market")
    .then(res => setJobs(res.data.data))
}, [])

const jobTrends = [
  { company: "Google", role: "Frontend Engineer", openings: 45 },
  { company: "Amazon", role: "SDE", openings: 120 },
  { company: "Microsoft", role: "Cloud Engineer", openings: 60 },
  { company: "Infosys", role: "System Engineer", openings: 200 }
]

export default function JobIntelligence(){

return(

<div className="bg-white/70 backdrop-blur p-6 rounded-xl border">

<h2 className="font-semibold mb-4">
Global Hiring Trends
</h2>

<div className="space-y-3">

{jobTrends.map((job,i)=>(

<div
key={i}
className="flex justify-between border p-3 rounded-lg"
>

<div>

<p className="font-semibold">
{job.company}
</p>

<p className="text-gray-500 text-sm">
{job.role}
</p>

</div>

<span className="text-blue-600 font-semibold">
{job.openings} openings
</span>

</div>

))}

</div>

</div>

)

}