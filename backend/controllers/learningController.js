import axios from "axios"

export const getResources = async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.freecodecamp.org/news/api/posts"
    )

    res.json(response.data)
  } catch (error) {
    console.error("Learning API Error:", error.message)
    res.status(500).json({ message: "Error fetching resources" })
  }
}