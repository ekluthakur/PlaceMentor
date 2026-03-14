import React from "react"

export default function TrendingPosts({posts}){

const trending = [...posts]
.sort((a,b)=>b.likes-a.likes)
.slice(0,5)

return(

<div className="bg-white/70 backdrop-blur p-6 rounded-xl border">

<h3 className="font-semibold mb-4">
🔥 Trending Posts
</h3>

<div className="space-y-3">

{trending.map((p,i)=>(

<div key={i} className="text-sm">

<p className="font-medium">
{p.author}
</p>

<p className="text-gray-500 line-clamp-2">
{p.content}
</p>

<p className="text-xs text-purple-600">
👍 {p.likes} likes
</p>

</div>

))}

</div>

</div>

)
}