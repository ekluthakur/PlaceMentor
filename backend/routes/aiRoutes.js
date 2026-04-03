import express from "express"
import axios from "axios"

const router = express.Router()

const API_KEY = process.env.OPENROUTER_API_KEY

/* ---------------- GENERATE QUESTION ---------------- */

router.post("/question", async (req,res)=>{

try{

const { role } = req.body

const response = await axios.post(
"https://openrouter.ai/api/v1/chat/completions",
{
model: "mistralai/mistral-7b-instruct",
messages: [
{
role:"user",
content:`Generate 1 ${role} interview question (easy level)`
}
]
},
{
headers:{
Authorization:`Bearer ${API_KEY}`,
"Content-Type":"application/json"
}
}
)

res.json({
question: response.data.choices[0].message.content
})

}catch(err){
res.status(500).json({msg:"AI question failed"})
}

})

/* ---------------- EVALUATE ANSWER ---------------- */

router.post("/feedback", async (req,res)=>{

try{

const { question, answer } = req.body

const response = await axios.post(
"https://openrouter.ai/api/v1/chat/completions",
{
model:"deepseek/deepseek-chat",
messages:[
{
role:"user",
content:`
Evaluate this answer.

Question:
${question}

Answer:
${answer}

Return JSON:
{
"score": number (0-10),
"feedback": "short feedback",
"improvement": "better answer"
}
`
}
]
},
{
headers:{
Authorization:`Bearer ${API_KEY}`,
"Content-Type":"application/json"
}
}
)

let text = response.data.choices[0].message.content

// CLEAN JSON
text = text.replace(/```json|```/g,"")

res.json(JSON.parse(text))

}catch(err){
console.log(err)
res.status(500).json({msg:"AI feedback failed"})
}

})

/* ---------------- SKILL EXTRACTION ---------------- */

router.post("/skills", async (req,res)=>{

try{

const { resumeText } = req.body

const response = await axios.post(
"https://openrouter.ai/api/v1/chat/completions",
{
model:"google/gemma-7b-it",
messages:[
{
role:"user",
content:`
Extract all technical skills from this resume.

Return only array format.

Resume:
${resumeText}
`
}
]
},
{
headers:{
Authorization:`Bearer ${API_KEY}`,
"Content-Type":"application/json"
}
}
)

let text = response.data.choices[0].message.content
text = text.replace(/```json|```/g,"")

res.json({ skills: JSON.parse(text) })

}catch(err){
res.status(500).json({msg:"Skill extraction failed"})
}

})

export default router