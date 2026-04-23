import axios from "axios"

export const generateFeedback = async (answer) => {
  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "user",
          content: `Evaluate this answer and give score out of 10 + feedback:\n${answer}`
        }
      ]
    },
    {
      headers: {
        Authorization: "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
      }
    }
  )

  return res.data.choices[0].message.content
}