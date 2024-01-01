import express from "express"
import { create } from "./Auth.service"

const router = express.Router()
router.post("/register", create)

export default router
