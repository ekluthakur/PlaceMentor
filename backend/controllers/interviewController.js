import Interview from "../models/Interview.js"
import {calculatePRS} from "../services/prsEngine.js"

export const saveInterview = async(req,res)=>{

  const {
    interviewScore,
    skillMatch,
    resumeScore,
    marketDemand
  } = req.body

  const prs = calculatePRS({
    interviewScore,
    skillMatch,
    resumeScore,
    marketDemand
  })

  const interview = await Interview.create({
    user:req.user._id,
    interviewScore,
    skillMatch,
    resumeScore,
    marketDemand,
    prs
  })

  res.json(interview)

}