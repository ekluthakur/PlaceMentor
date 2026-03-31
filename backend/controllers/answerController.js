import Answer from "../models/Answer.js"

export const saveAnswer = async (req, res) => {
  try {

    console.log("📥 Incoming data:", req.body)

    const { question, answer, company, role } = req.body

    const newAnswer = new Answer({
      question,
      answer,
      company,
      role
    })

    await newAnswer.save()

    res.status(201).json({
      message: "Answer saved successfully",
      data: newAnswer
    })

  } catch (error) {
    res.status(500).json({
      message: "Error saving answer",
      error: error.message
    })
  }
}