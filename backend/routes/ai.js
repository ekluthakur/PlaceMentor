const express = require("express")
const router = express.Router()

router.post("/skills", async (req,res)=>{

const { resumeText } = req.body

if(!resumeText){
return res.json({ skills: [] })
}

/* SIMPLE SKILL DETECTION (NO AI NEEDED FOR DEMO) */

const skillsList = ["react","node.js","mongodb","dsa","javascript","html","css"]

const found = skillsList.filter(skill =>
resumeText.toLowerCase().includes(skill)
)

res.json({ skills: found })

})

module.exports = router