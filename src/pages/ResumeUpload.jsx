import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import GlassCard from "../components/cards/GlassCard"
import SectionTitle from "../components/ui/SectionTitle"

export default function ResumeUpload(){

const navigate = useNavigate()

const [file,setFile] = useState(null)
const [dragging,setDragging] = useState(false)
const [loading,setLoading] = useState(false)

/* -----------------------------
Handle Upload
------------------------------ */

const handleFile = (selectedFile)=>{
setFile(selectedFile)
}

/* -----------------------------
Drag Events
------------------------------ */

const handleDrop = (e)=>{
e.preventDefault()
setDragging(false)

const uploadedFile = e.dataTransfer.files[0]

if(uploadedFile){
handleFile(uploadedFile)
}
}

/* -----------------------------
Analyze Resume
------------------------------ */

const analyzeResume = ()=>{

if(!file) return

setLoading(true)

/* simulate backend call */

setTimeout(()=>{

navigate("/resume-analyzer",{
state:{
name:file.name,
size:file.size
}
})

},1500)

}

return(

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">

<h1 className="text-3xl font-bold mb-6">
Resume Analyzer
</h1>

<GlassCard>

<SectionTitle title="Upload Your Resume" />

<div
onDragOver={(e)=>{e.preventDefault();setDragging(true)}}
onDragLeave={()=>setDragging(false)}
onDrop={handleDrop}
className={`mt-6 border-2 border-dashed rounded-xl p-12 text-center transition
${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
`}
>

<p className="text-lg text-gray-600">
Drag & Drop Resume Here
</p>

<p className="text-sm text-gray-400 mt-2">
PDF / DOCX Supported
</p>

<input
type="file"
accept=".pdf,.doc,.docx"
onChange={(e)=>handleFile(e.target.files[0])}
className="hidden"
id="resumeInput"
/>

<label
htmlFor="resumeInput"
className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
>
Choose File
</label>

</div>

{/* File Preview */}

{file && (

<div className="mt-6 bg-white/60 backdrop-blur p-4 rounded-lg border">

<p className="font-semibold">
📄 {file.name}
</p>

<p className="text-sm text-gray-500">
Size: {(file.size/1024).toFixed(1)} KB
</p>

</div>

)}

{/* Analyze Button */}

<div className="mt-8">

<button
onClick={analyzeResume}
disabled={!file || loading}
className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
>

{loading ? "Analyzing Resume..." : "Analyze Resume"}

</button>

</div>

</GlassCard>

</div>

)

}