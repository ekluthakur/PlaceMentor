import axios from "axios"

export const analyzeResume = async (req, res) => {
  try {
    const { text } = req.body

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        inputs: text,
        parameters: {
          candidate_labels: [
            "JavaScript",
            "React",
            "Node.js",
            "Python",
            "Java",
            "MongoDB"
          ]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        }
      }
    )

    res.status(200).json(response.data)
  } catch (error) {
    console.error("AI API Error:", error.message)
    res.status(500).json({ message: "Error analyzing resume" })
  }
}