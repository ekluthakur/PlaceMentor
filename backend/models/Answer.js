import mongoose from "mongoose"

const answerSchema = new mongoose.Schema({
  question: String,
  answer: String,
  company: String,
  role: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model("Answer", answerSchema)