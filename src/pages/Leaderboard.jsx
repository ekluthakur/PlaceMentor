import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Leaderboard() {

const navigate = useNavigate()

const [users,setUsers] = useState([])
const [search,setSearch] = useState("")
const [filter,setFilter] = useState("all")

/* ---------------- FETCH DATA ---------------- */

useEffect(()=>{

async function load(){

try{
// ✅ BACKEND (if running)
const res = await fetch("http://localhost:5000/api/leaderboard")
const data = await res.json()

setUsers(data)

}catch{

// ✅ FALLBACK (localStorage)
const history =
JSON.parse(localStorage.getItem("interviewHistory")) || []

const grouped = {}

history.forEach((item,i)=>{

const name = item.company || "User"

if(!grouped[name]){
grouped[name] = {
id:i,
name,
prs:item.prs
}
}else{
grouped[name].prs =
Math.max(grouped[name].prs,item.prs)
}

})

setUsers(Object.values(grouped))
}

}

load()

},[])

/* ---------------- SORT ---------------- */

const sortedUsers = [...users].sort((a,b)=>b.prs-a.prs)

/* ---------------- SEARCH ---------------- */

const filteredUsers = sortedUsers.filter(user =>
user.name?.toLowerCase().includes(search.toLowerCase())
)

/* ---------------- FILTER ---------------- */

const displayUsers =
filter === "top"
? filteredUsers.slice(0,10)
: filteredUsers

/* ---------------- PODIUM ---------------- */

const topThree = displayUsers.slice(0,3)
const others = displayUsers.slice(3)

/* ---------------- NAVIGATION ---------------- */

const openProfile = (user)=>{
navigate(`/profile/${user.id}`, { state:user })
}

/* ---------------- UI ---------------- */

return (

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">

<div className="max-w-6xl mx-auto p-10">

<h1 className="text-4xl font-bold text-center mb-10">
🏆 Leaderboard
</h1>

{/* SEARCH + FILTER */}
<div className="flex justify-between mb-10 flex-wrap gap-4">

<input
type="text"
placeholder="Search users..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border px-4 py-2 rounded-lg w-60"
/>

<div className="flex gap-3">

<button
onClick={()=>setFilter("all")}
className={`px-4 py-2 rounded-lg ${
filter==="all"
? "bg-blue-600 text-white hover:bg-blue-700"
: "bg-gray-200"
}`}
>
All Users
</button>

<button
onClick={()=>setFilter("top")}
className={`px-4 py-2 rounded-lg ${
filter==="top"
? "bg-purple-600 text-white"
: "bg-gray-200"
}`}
>
Top 10
</button>

</div>

</div>

{/* PODIUM */}
{topThree.length >=3 && (

<div className="flex justify-center items-end gap-8 mb-16">

{/* SECOND */}
<div
onClick={()=>openProfile(topThree[1])}
className="cursor-pointer bg-white shadow-xl rounded-xl p-6 w-40 text-center transform hover:scale-105 transition"
>

<div className="text-3xl mb-2">🥈</div>

<img
src={`https://api.dicebear.com/7.x/initials/svg?seed=${topThree[1].name}`}
className="w-14 h-14 mx-auto mb-2 rounded-full"
/>

<h3 className="font-semibold">
{topThree[1].name}
</h3>

<p className="text-blue-600 font-bold">
PRS {topThree[1].prs}
</p>

</div>

{/* FIRST */}
<div
onClick={()=>openProfile(topThree[0])}
className="cursor-pointer bg-yellow-100 shadow-2xl rounded-xl p-8 w-44 text-center transform hover:scale-110 transition"
>

<div className="text-4xl mb-2">🥇</div>

<img
src={`https://api.dicebear.com/7.x/initials/svg?seed=${topThree[0].name}`}
className="w-16 h-16 mx-auto mb-2 rounded-full"
/>

<h3 className="font-bold text-lg">
{topThree[0].name}
</h3>

<p className="text-yellow-700 font-bold">
PRS {topThree[0].prs}
</p>

</div>

{/* THIRD */}
<div
onClick={()=>openProfile(topThree[2])}
className="cursor-pointer bg-white shadow-xl rounded-xl p-6 w-40 text-center transform hover:scale-105 transition"
>

<div className="text-3xl mb-2">🥉</div>

<img
src={`https://api.dicebear.com/7.x/initials/svg?seed=${topThree[2].name}`}
className="w-14 h-14 mx-auto mb-2 rounded-full"
/>

<h3 className="font-semibold">
{topThree[2].name}
</h3>

<p className="text-blue-600 font-bold">
PRS {topThree[2].prs}
</p>

</div>

</div>
)}

{/* TABLE */}

<div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">

{others.length === 0 && (
<p className="text-center text-gray-500">
No users found
</p>
)}

{others.map((user,index)=> (

<div
key={user.id || index}
onClick={()=>openProfile(user)}
className="flex justify-between items-center border-b py-3 hover:bg-gray-50 cursor-pointer"
>

<span className="font-semibold">
#{index+4}
</span>

<div className="flex items-center gap-3">

<img
src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
className="w-8 h-8 rounded-full"
/>

<span>{user.name}</span>

</div>

<span className="text-blue-600 font-semibold">
PRS {user.prs}
</span>

</div>

))}

</div>

{/* BACK */}

<div className="text-center mt-12">

<button
onClick={()=>navigate("/")}
className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
>
Back to Dashboard
</button>

</div>

</div>

</div>
)
}