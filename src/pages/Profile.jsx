import React, { useState, useEffect } from "react"
import GlassCard from "../components/cards/GlassCard"
import { useNavigate } from "react-router-dom"

export default function Profile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
    photo: "",
    prs: 0
  })

  const [editing, setEditing] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
            navigate("/login")
            return
        }

        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!res.ok) {
            throw new Error("Failed to fetch")
        }

        const data = await res.json()

        console.log("USER DATA:", data)

        if (res.ok) {
          setUser({
            name: data.name || "",
            email: data.email || "",
            role: data.role || "",
            bio: data.bio || "",
            photo: data.photo || "",
            prs: data.prs || 0
          })
        } else {
          alert("❌ " + data.message)
          navigate("/login")
        }

      } catch (err) {
        console.log(err)
      }
    }

    fetchUser()
  }, [navigate])

const saveProfile = async () => {
  try {
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:5000/api/auth/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      setEditing(false)
      alert("✅ Profile updated")
    } else {
      alert("❌ " + data.message)
    }

  } catch (err) {
    console.log(err)
    alert("❌ Server error")
  }
}

  const changePhoto = (e) => {
    const file = e.target.files[0]

    if (file) {
      const url = URL.createObjectURL(file)
      setUser({ ...user, photo: url })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">

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

          <input type="file" onChange={changePhoto} />

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <input value={user.name} disabled={!editing}
            onChange={(e)=>setUser({...user,name:e.target.value})}
            className="border p-2 rounded" />

          <input value={user.email} disabled className="border p-2 rounded" />

          <input value={user.role} disabled={!editing}
            onChange={(e)=>setUser({...user,role:e.target.value})}
            className="border p-2 rounded" />

          <input value={user.prs} disabled className="border p-2 rounded" />

          <textarea value={user.bio} disabled={!editing}
            onChange={(e)=>setUser({...user,bio:e.target.value})}
            className="border p-2 rounded col-span-2" />

        </div>

        <div className="mt-6">
          {editing ? (
            <button onClick={saveProfile} className="bg-green-600 text-white px-6 py-2 rounded">
              Save
            </button>
          ) : (
            <button onClick={()=>setEditing(true)} className="bg-blue-600 text-white px-6 py-2 rounded">
              Edit
            </button>
          )}
        </div>

      </GlassCard>

      <div className="flex gap-4 mt-8">

        <button onClick={()=>navigate("/profile-analytics")}
          className="bg-purple-600 text-white px-6 py-2 rounded">
          Analytics
        </button>

        <button onClick={()=>navigate("/interview-history")}
          className="bg-blue-600 text-white px-6 py-2 rounded">
          History
        </button>

        <button onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded">
          Logout
        </button>

      </div>

    </div>
  )
}