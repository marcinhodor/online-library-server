import express from "express"
import { handleNewUser } from "./Auth.service"

const router = express.Router()
router.post("/register", handleNewUser)

export default router
