import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero-bg.png";

export default function Hero() {

const navigate = useNavigate()

return (

<section className="relative pt-32 pb-24 px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

{/* Background Glow */}

<div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 opacity-20 blur-3xl rounded-full"></div>
<div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400 opacity-20 blur-3xl rounded-full"></div>

{/* LEFT CONTENT */}

<div>

<h1 className="text-5xl md:text-6xl font-bold leading-tight">

<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

Crack Your Dream Job <br/> With AI Interview Practice

</span>

</h1>

<p className="mt-6 text-gray-600 text-lg max-w-lg">

Practice real interviews, analyze resumes, and improve your placement readiness with AI-powered insights.

</p>

<div className="flex gap-4 mt-8">

<button
onClick={()=>navigate("/register")}
className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:scale-105 transition"
>
Start Practicing
</button>

<button
onClick={()=>navigate("/login")}
className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
>
Login
</button>

</div>

</div>


{/* RIGHT IMAGE */}

<div className="flex justify-center">

<img
src={heroImg}
alt="AI Interview"
className="w-[500px] drop-shadow-2xl animate"
/>

</div>

</section>

)

}