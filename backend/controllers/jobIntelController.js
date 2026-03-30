import axios from "axios"

export const getJobs = async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.arbeitnow.com/api/job-board-api"
    )

    res.status(200).json(response.data)
  } catch (error) {
    console.error("Job API Error:", error.message)
    res.status(500).json({ message: "Error fetching jobs" })
  }
}