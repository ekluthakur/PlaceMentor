import axios from "axios"

export const fetchQuestions = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/interview/questions"
    )
    return res.data
  } catch (error) {
    console.error("Error fetching questions:", error)
    return []
  }
}