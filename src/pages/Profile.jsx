import React,{useState,useEffect} from "react"
import GlassCard from "../components/ui/GlassCard"
import SectionTitle from "../components/ui/SectionTitle"
import {useNavigate} from "react-router-dom"

export default function Profile(){

const [user,setUser] = useState({

name:"",
email:"",
role:"",
bio:"",
photo:"",
prs:0

})

const [editing,setEditing] = useState(false)
const navigate = useNavigate()
const handleLogout = () => {
navigate("/login");
};


useEffect(()=>{

const saved =
JSON.parse(localStorage.getItem("userProfile"))

if(saved) setUser(saved)

},[])



const saveProfile = ()=>{

localStorage.setItem(
"userProfile",
JSON.stringify(user)
)

setEditing(false)

}



const changePhoto = (e)=>{

const file = e.target.files[0]

if(file){

const url = URL.createObjectURL(file)

setUser({...user,photo:url})

}

}


return(

<div className="">

<h1 className="text-3xl font-bold mb-8">
My Profile
</h1>


<GlassCard>

<div className="flex gap-6 items-center">

<img
src={
user.photo ||
"https://api.dicebear.com/7.x/initials/svg?seed=User"
}
className="w-24 h-24 rounded-full"
/>

<div>

<input
type="file"
onChange={changePhoto}
className="text-sm"
/>

</div>

</div>


<div className="grid md:grid-cols-2 gap-6 mt-8">


<div>

<label>Name</label>

<input
value={user.name}
disabled={!editing}
onChange={(e)=>setUser({...user,name:e.target.value})}
className="border w-full p-2 rounded"
/>

</div>


<div>

<label>Email</label>

<input
value={user.email}
disabled={!editing}
onChange={(e)=>setUser({...user,email:e.target.value})}
className="border w-full p-2 rounded"
/>

</div>


<div>

<label>Role</label>

<input
value={user.role}
disabled={!editing}
onChange={(e)=>setUser({...user,role:e.target.value})}
className="border w-full p-2 rounded"
/>

</div>


<div>

<label>PRS Score</label>

<input
value={user.prs}
disabled
className="border w-full p-2 rounded"
/>

</div>


<div className="md:col-span-2">

<label>Bio</label>

<textarea
value={user.bio}
disabled={!editing}
onChange={(e)=>setUser({...user,bio:e.target.value})}
className="border w-full p-2 rounded"
/>

</div>

</div>



<div className="flex gap-4 mt-6">

{editing ? (

<button
onClick={saveProfile}
className="bg-green-600 text-white px-6 py-2 rounded"
>
Save
</button>

):(

<button
onClick={()=>setEditing(true)}
className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
>
Edit Profile
</button>

)}

</div>

</GlassCard>

<div className="flex gap-4 mt-8">

<button
onClick={()=>navigate("/profile-analytics")}
className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
>
View Analytics
</button>

<button
onClick={()=>navigate("/interview-history")}
className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
>
Interview History
</button>

<button
onClick={handleLogout}
className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
>
 Logout
 </button>

</div>

</div>

)

}