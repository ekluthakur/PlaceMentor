import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import Interview from "../models/Interview.js"
import auth from "../middleware/auth.js"

const router = express.Router()

// REGISTER
router.post("/register", async (req,res)=>{
  const {name,email,password} = req.body

  const hashed = await bcrypt.hash(password,10)

  const user = await User.create({
    name,
    email,
    password: hashed
  })

  res.json(user)
})

// LOGIN
router.post("/login", async (req,res)=>{
  const {email,password} = req.body

  const user = await User.findOne({email})

  if(!user) return res.status(400).json({msg:"User not found"})

  const match = await bcrypt.compare(password,user.password)

  if(!match) return res.status(400).json({msg:"Wrong password"})

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

  res.json({token,user})
})

// SAVE INTERVIEW
router.post("/", auth, async (req,res)=>{

const {company,role,score,prs} = req.body

const interview = await Interview.create({
  userId: req.user.id,
  company,
  role,
  score,
  prs
})
// update user PRS (latest)
await User.findByIdAndUpdate(req.user.id,{prs})

res.json(interview)

})

// GET USER HISTORY
router.get("/history", auth, async (req,res)=>{

const data = await Interview
.find({userId:req.user.id})
.sort({createdAt:-1})

res.json(data)

})

export default router