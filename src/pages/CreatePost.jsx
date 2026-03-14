import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import GlassCard from "../components/ui/GlassCard"

export default function CreatePost(){

const navigate = useNavigate()

const [content,setContent] = useState("")

const publishPost = ()=>{

if(!content.trim()) return

const newPost = {

id:Date.now(),

author:"Student",

content:content,

likes:0,

views:0,

comments:[],

date:new Date()

}

const oldPosts =
JSON.parse(localStorage.getItem("communityPosts")) || []

const updated = [newPost,...oldPosts]

localStorage.setItem(
"communityPosts",
JSON.stringify(updated)
)

navigate("/community")

}

return(

<div className="">

<h1 className="text-3xl font-bold mb-6">
Create Post
</h1>

<GlassCard>

<textarea
value={content}
onChange={(e)=>setContent(e.target.value)}
rows="6"
placeholder="Share your interview experience..."
className="w-full border rounded-lg p-3"
/>

<div className="flex gap-4 mt-6">

<button
onClick={publishPost}
className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
>
Publish
</button>

<button
onClick={()=>navigate("/community")}
className="bg-gray-500 text-white px-6 py-2 rounded-lg"
>
Cancel
</button>

</div>

</GlassCard>

</div>

)

}