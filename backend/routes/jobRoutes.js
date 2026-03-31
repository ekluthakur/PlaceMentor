import express from "express"

const router = express.Router()

// ✅ Job Market API
router.get("/market", (req, res) => {
  res.json({
    data: [
      { company: "Google", role: "Frontend Engineer", openings: 45 },
      { company: "Amazon", role: "SDE", openings: 120 },
      { company: "Microsoft", role: "Cloud Engineer", openings: 60 },
      { company: "Infosys", role: "System Engineer", openings: 200 }
    ]
  })
})

export default router