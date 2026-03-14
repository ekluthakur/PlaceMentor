import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PostCard from "../components/PostCard"
import TrendingPosts from "../components/TrendingPosts"
import TopContributors from "../components/TopContributors"
import GlassCard from "../components/ui/GlassCard"

export default function Community(){

const navigate = useNavigate()

const [posts,setPosts] = useState([])
const [notifications,setNotifications] = useState([])

/* ---------------- LOAD POSTS ---------------- */

useEffect(()=>{

const saved =
JSON.parse(localStorage.getItem("communityPosts")) || []

setPosts(saved)

},[])


/* ---------------- SAVE POSTS ---------------- */

const savePosts = (updated)=>{

setPosts(updated)

localStorage.setItem(
"communityPosts",
JSON.stringify(updated)
)

}


/* ---------------- GLOBAL NOTIFICATION ---------------- */

const pushNotification = (message)=>{

const newNote = {
id:Date.now(),
message,
time:new Date().toLocaleTimeString()
}

const updated = [newNote,...notifications].slice(0,5)

setNotifications(updated)

}


/* ---------------- LIKE POST ---------------- */

const likePost = (id)=>{

const updated = posts.map(p=>{

if(p.id===id){

pushNotification(`❤️ Someone liked a post`)

return {...p,likes:p.likes+1}

}

return p

})

savePosts(updated)

}


/* ---------------- COMMENT POST ---------------- */

const addComment = (id,comment)=>{

const updated = posts.map(p=>{

if(p.id===id){

pushNotification(`💬 New comment added`)

return {
...p,
comments:[...p.comments,comment]
}

}

return p

})

savePosts(updated)

}


/* ---------------- FOLLOW USER ---------------- */

const followUser = (name)=>{

pushNotification(`👤 You followed ${name}`)

alert(`You followed ${name}`)

}


/* ---------------- STATS ---------------- */

const totalLikes = posts.reduce((a,b)=>a+b.likes,0)


return(

<div className="">

<div className="max-w-7xl mx-auto p-6">


{/* HEADER */}

<div className="flex justify-between items-center mb-8">

<h1 className="text-3xl font-bold">
Community
</h1>

<button
onClick={()=>navigate("/create-post")}
className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
>
Create Post
</button>

</div>



{/* GLOBAL NOTIFICATION PANEL */}

{notifications.length > 0 && (

<div className="mb-6 space-y-2">

{notifications.map(note=>(
<div
key={note.id}
className="bg-white/70 backdrop-blur border p-3 rounded-lg text-sm text-gray-700"
>
{note.message}
<span className="text-gray-400 ml-3 text-xs">
{note.time}
</span>
</div>
))}

</div>

)}



{/* MAIN GRID */}

<div className="grid grid-cols-12 gap-6">


{/* LEFT SIDEBAR */}

<div className="col-span-3 space-y-6">

<GlassCard>

<h3 className="font-semibold mb-4">
Community Topics
</h3>

<ul className="space-y-2 text-gray-600">

<li className="hover:text-purple-600 cursor-pointer">
React Interviews
</li>

<li className="hover:text-purple-600 cursor-pointer">
DSA Preparation
</li>

<li className="hover:text-purple-600 cursor-pointer">
System Design
</li>

<li className="hover:text-purple-600 cursor-pointer">
Placement Tips
</li>

<li className="hover:text-purple-600 cursor-pointer">
Career Advice
</li>

</ul>

</GlassCard>



<GlassCard>

<h3 className="font-semibold mb-4">
Your Activity
</h3>

<p className="text-sm text-gray-600">
Posts Created: {posts.length}
</p>

<p className="text-sm text-gray-600">
Total Likes: {totalLikes}
</p>

</GlassCard>

</div>



{/* MAIN FEED */}

<div className="col-span-6 space-y-6">


{/* QUICK CREATE */}

<GlassCard>

<div className="flex gap-3 items-center">

<img
src="https://api.dicebear.com/7.x/initials/svg?seed=User"
className="w-10 h-10 rounded-full"
/>

<input
placeholder="Share your interview experience..."
className="flex-1 border rounded-lg px-4 py-2"
/>

<button
onClick={()=>navigate("/create-post")}
className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
>
Create
</button>

</div>

</GlassCard>



{/* EMPTY STATE */}

{posts.length === 0 && (

<GlassCard className="text-gray-500 text-center">

No posts yet. Be the first to share!

</GlassCard>

)}



{/* POSTS */}

{posts.map(post=>(
<PostCard
key={post.id}
post={post}
onLike={likePost}
onComment={addComment}
onFollow={followUser}
/>
))}

</div>



{/* RIGHT SIDEBAR */}

<div className="col-span-3 space-y-6">


<GlassCard>
<TrendingPosts posts={posts}/>
</GlassCard>


<GlassCard>
<TopContributors posts={posts}/>
</GlassCard>


<GlassCard>

<h3 className="font-semibold mb-4">
Community Stats
</h3>

<p className="text-sm text-gray-600">
Total Posts: {posts.length}
</p>

<p className="text-sm text-gray-600">
Total Likes: {totalLikes}
</p>

<p className="text-sm text-gray-600">
Members: 1,245
</p>

</GlassCard>

</div>


</div>

</div>

</div>

)

}