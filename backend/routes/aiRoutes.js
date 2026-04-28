import express from "express"
import axios from "axios"

const router = express.Router()

const API_KEY = process.env.OPENROUTER_API_KEY
console.log("API KEY CHECK:", API_KEY)

/* ---------------- GENERATE QUESTION ---------------- */

router.post("/question", async (req, res) => {
  try {

    const { role } = req.body

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `You are an AI mentor.
Give short helpful advice.

User query: ${role}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
          "X-Title": "PlaceMentor"
        }
      }
    )

    const reply = response.data?.choices?.[0]?.message?.content

    res.json({ reply })

  } catch (err) {

    console.log("❌ AI ERROR FULL:", err.response?.data || err.message)

    res.status(500).json({ msg: "AI failed" })
  }
})

/* ---------------- EVALUATE ANSWER ---------------- */

router.post("/feedback", async (req,res)=>{

try{

const { question, answer } = req.body

const response = await axios.post(
"https://openrouter.ai/api/v1/chat/completions",
{
model:"deepseek/deepseek-chat-v3",
messages:[
{
role:"user",
content: `
You are a strict technical interviewer.

Evaluate the answer properly.

Rules:
- If answer is irrelevant → score = 0-3
- If partially correct → score = 4-6
- If good → score = 7-8
- If excellent → score = 9-10

Return ONLY valid JSON:

{
"score": number,
"feedback": "1-2 line real feedback",
"improvement": "better corrected answer"
}

Question: ${question}
Answer: ${answer}
`
}
]
},
{
headers:{
  Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
  "Content-Type":"application/json",
  "HTTP-Referer": "http://localhost:5173",
  "X-Title": "PlaceMentor"
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
model:"openai/gpt-3.5-turbo",
messages:[
{
role:"user",

content: `
Extract all technical skills from this resume.

Return ONLY valid JSON array.
No explanation.

Example:
["react.js","node.js","mongodb"]

Resume:
${resumeText}
`
}
]
},
{
headers:{
  Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
  "Content-Type":"application/json",
  "HTTP-Referer": "http://localhost:5173",
  "X-Title": "PlaceMentor"
}
}
)

let text = response.data.choices[0].message.content

// CLEAN
text = text.replace(/```json|```/g,"").trim()

let skills = []

try {

// try direct parse
skills = JSON.parse(text)

}catch{

// 🔥 fallback (extract array manually)
const match = text.match(/\[.*\]/)

if(match){
  try{
    skills = JSON.parse(match[0])
  }catch{
    skills = []
  }
}

}

res.json({ skills })

}catch(err){
console.log("AI ERROR:", err.response?.data || err.message)
res.status(500).json({msg:"Skill extraction failed"})
}

})

export default router