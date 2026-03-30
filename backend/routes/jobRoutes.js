import express from "express"
import {getJobs} from "../controllers/jobIntelController.js"

const router = express.Router()

router.get("/market",getJobs)

export default router