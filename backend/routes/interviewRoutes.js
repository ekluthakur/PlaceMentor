import express from "express"

const router = express.Router()

router.get("/questions", (req, res) => {
  res.json([
    {
      company: "Google",
      role: "Frontend Developer",
      question: "Explain Virtual DOM"
    },
    {
      company: "Amazon",
      role: "SDE",
      question: "What is system design?"
    },
    {
      company: "Microsoft",
      role: "Backend Developer",
      question: "What is REST API?"
    }
  ])
})

export default router