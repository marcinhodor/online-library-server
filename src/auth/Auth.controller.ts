import express from "express"
import { register } from "./Auth.service"

const router = express.Router()
router.post("/register", register)

export default router
