import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavbarUser from "../components/NavbarUser"

export default function Leaderboard() {

const navigate = useNavigate()

/* ---------------- USERS DATA ---------------- */

const [users,setUsers] = useState([
{ id:1, name:"Rahul", prs:95 },
{ id:2, name:"Anjali", prs:90 },
{ id:3, name:"Aman", prs:87 },
{ id:4, name:"Riya", prs:82 },
{ id:5, name:"Karan", prs:79 },
{ id:6, name:"Neha", prs:75 }
])

const [search,setSearch] = useState("")
const [filter,setFilter] = useState("all")

/* ---------------- SORT USERS ---------------- */

const sortedUsers = [...users].sort((a,b)=>b.prs-a.prs)

/* ---------------- SEARCH FILTER ---------------- */

const filteredUsers = sortedUsers.filter(user =>
user.name.toLowerCase().includes(search.toLowerCase())
)

/* ---------------- FILTER MODE ---------------- */

const displayUsers =
filter === "top"
? filteredUsers.slice(0,10)
: filteredUsers

/* ---------------- PODIUM ---------------- */

const topThree = displayUsers.slice(0,3)
const others = displayUsers.slice(3)

/* ---------------- NAVIGATION ---------------- */

const openProfile = (user)=>{

// ready for backend profile page later
navigate(`/profile/${user.id}`,{state:user})

}

/* ---------------- UI ---------------- */

return (

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">


<div className="max-w-6xl mx-auto p-10">


{/* PAGE TITLE */}

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
: "bg-gray-200 "
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



{/* RANKING TABLE */}

<div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">

{others.length === 0 && (
<p className="text-center text-gray-500">
No users found
</p>
)}


{others.map((user,index)=> (

<div
key={user.id}
onClick={()=>openProfile(user)}
className="flex justify-between items-center border-b py-3 hover:bg-gray-50 transition cursor-pointer"
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


{/* BACK BUTTON */}

<div className="text-center mt-12">

<button
onClick={()=>navigate("/")}
className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
>
Back to Dashboard
</button>

</div>


</div>

</div>

)
}