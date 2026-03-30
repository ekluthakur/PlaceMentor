import express from "express"
import {saveInterview} from "../controllers/interviewController.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/",protect,saveInterview)

export default router