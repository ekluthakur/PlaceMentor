import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import learningRoutes from "./routes/learningRoutes.js"
import githubRoutes from "./routes/githubRoutes.js"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import interviewRoutes from "./routes/interviewRoutes.js"
import jobRoutes from "./routes/jobRoutes.js"
import resumeRoutes from "./routes/resumeRoutes.js"
import answerRoutes from "./routes/answerRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/github", githubRoutes)
app.use("/api/learning", learningRoutes)
app.use("/api/resume", resumeRoutes)
app.use("/api/answers", answerRoutes)

app.use("/api/auth",authRoutes)
app.use("/api/interview",interviewRoutes)
app.use("/api/jobs",jobRoutes)

app.get("/",(req,res)=>{
  res.send("API running...")
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})