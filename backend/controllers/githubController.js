import axios from "axios"

export const getGithubSkills = async (req, res) => {
  try {
    const { username } = req.params

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    )

    const languages = response.data
      .map(repo => repo.language)
      .filter(Boolean)

    res.status(200).json({ languages })
  } catch (error) {
    console.error("GitHub API Error:", error.message)
    res.status(500).json({ message: "Error fetching GitHub data" })
  }
}