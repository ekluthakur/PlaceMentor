import React from "react"

export default function TopContributors({posts}){

const contributors = {}

posts.forEach(p=>{
contributors[p.author] =
(contributors[p.author] || 0) + p.likes
})

const leaderboard =
Object.entries(contributors)
.sort((a,b)=>b[1]-a[1])
.slice(0,5)

return(

<div className="bg-white/70 backdrop-blur p-6 rounded-xl border">

<h3 className="font-semibold mb-4">
🏆 Top Contributors
</h3>

<div className="space-y-3">

{leaderboard.map(([name,score],i)=>(

<div key={i} className="flex justify-between text-sm">

<span>{name}</span>

<span className="text-purple-600 font-semibold">
{score}
</span>

</div>

))}

</div>

</div>

)
}