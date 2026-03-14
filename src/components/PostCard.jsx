import React, { useState } from "react"

export default function PostCard({post,onLike,onComment,onFollow}){

const [comment,setComment] = useState("")

return(

<div className="bg-white/70 backdrop-blur p-6 rounded-xl border shadow-sm">

{/* Author */}

<div className="flex justify-between items-center">

<div className="flex items-center gap-3">

<img
src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`}
alt="avatar"
className="w-10 h-10 rounded-full"
/>

<div>
<p className="font-semibold">{post.author}</p>

<p className="text-xs text-gray-500">
{new Date(post.date).toLocaleString()}
</p>
</div>

</div>

<div className="flex items-center gap-4">

<button
onClick={()=>onFollow(post.author)}
className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
>
Follow
</button>

<p className="text-sm text-gray-400">
👀 {post.views}
</p>

</div>

</div>

{/* Content */}

<p className="mt-4 text-gray-700">
{post.content}
</p>

{/* Actions */}

<div className="flex gap-6 mt-4 text-sm">

<button
onClick={()=>onLike(post.id)}
className="text-blue-600"
>
👍 Like ({post.likes})
</button>

<span className="text-green-600">
💬 Comment ({post.comments.length})
</span>

<button
onClick={()=>navigator.share?.({
title:"Community Post",
text:post.content
})}
className="text-purple-600"
>
🔗 Share
</button>

</div>

{/* Comment Box */}

<div className="mt-4">

<input
value={comment}
onChange={(e)=>setComment(e.target.value)}
placeholder="Write a comment..."
className="w-full border rounded-lg p-2"
/>

<button
onClick={()=>{
if(comment.trim()){
onComment(post.id,comment)
setComment("")
}
}}
className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
>
Post Comment
</button>

</div>

{/* Comments */}

<div className="mt-4 space-y-2">

{post.comments.map((c,i)=>(
<p key={i} className="text-sm text-gray-600">
💬 {c}
</p>
))}

</div>

</div>

)
}