import axios from "axios"

export const fetchQuestions = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/interview/questions")
    console.log("API RESPONSE:", res.data)
    return res.data
  } catch (error) {
    console.error("ERROR FETCHING QUESTIONS:", error)
    return []
  }
}