import React, { useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e) => {
  e.preventDefault()

  console.log("Sending:", form)

  if (!form.email || !form.password) {
    alert("⚠️ Please fill all fields")
    return
  }

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
  email: form.email.trim().toLowerCase(),
  password: form.password.trim()
})
  })

  const data = await res.json()

  if (res.ok) {
    localStorage.setItem("token", data.token)
    navigate("/profile")
  } else {
    alert("❌ " + data.message)
  }
}

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-gray-50">

        <div className="bg-white shadow-xl rounded-xl p-8 w-[400px]">

          <h2 className="text-2xl font-bold text-center mb-6">
            Login to PlaceMentor
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input name="email" type="email" required placeholder="Email" onChange={handleChange} className="border p-3 rounded-lg" />

            <input name="password" type="password" required placeholder="Password" onChange={handleChange} className="border p-3 rounded-lg" />

            <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg">
              Login
            </button>

          </form>

        </div>

      </div>
    </div>
  )
}