import axios from "axios"

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