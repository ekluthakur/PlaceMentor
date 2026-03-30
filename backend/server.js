import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import interviewRoutes from "./routes/interviewRoutes.js"
import jobRoutes from "./routes/jobRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/interviews",interviewRoutes)
app.use("/api/jobs",jobRoutes)

app.get("/",(req,res)=>{
  res.send("PlaceMentor API running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})