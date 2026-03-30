import express from "express"
import { getGithubSkills } from "../controllers/githubController.js"

const router = express.Router()

router.get("/:username", getGithubSkills)

export default router