import axios from "axios"
import Interview from "../models/Interview.js"


// ✅ 1. FETCH QUESTIONS FROM STACKOVERFLOW
export const getQuestions = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.stackexchange.com/2.3/questions?order=desc&sort=votes&site=stackoverflow"
    )

    res.status(200).json(response.data.items)

  } catch (error) {
    console.error("Questions API Error:", error.message)
    res.status(500).json({ message: "Error fetching questions" })
  }
}


// ✅ 2. SAVE INTERVIEW RESULT
export const saveInterview = async (req, res) => {
  try {
    const {
      question,
      answer,
      feedback,
      interviewScore,
      skillMatch,
      resumeScore,
      marketDemand,
      prs
    } = req.body

    const interview = new Interview({
      user: req.user._id,
      question,
      answer,
      feedback,
      interviewScore,
      skillMatch,
      resumeScore,
      marketDemand,
      prs
    })

    await interview.save()

    res.json({ message: "Interview saved successfully" })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}


// ✅ 3. GET USER INTERVIEW HISTORY
export const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview
      .find({ user: req.user._id })
      .sort({ createdAt: -1 }) // latest first

    res.json(interviews)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}