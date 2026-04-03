import React, { useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e) => {
  e.preventDefault()

  // ✅ VALIDATION
  if (!form.name || !form.email || !form.password || !form.role) {
    alert("⚠️ All fields are required")
    return
  }

  if (form.password.length < 6) {
    alert("⚠️ Password must be at least 6 characters")
    return
  }

  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  })

  const data = await res.json()

  if (res.ok) {
    alert("✅ Registered successfully")
    navigate("/login")
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
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input name="name" required placeholder="Full Name" onChange={handleChange} className="border p-3 rounded-lg" />

            <input name="email" type="email" required placeholder="Email" onChange={handleChange} className="border p-3 rounded-lg" />

            <input name="password" type="password" required placeholder="Password" onChange={handleChange} className="border p-3 rounded-lg" />

            <select name="role" required onChange={handleChange} className="border p-3 rounded-lg">
              <option value="">Select Role</option>
              <option>Software Developer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
            </select>

            <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg">
              Register
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}