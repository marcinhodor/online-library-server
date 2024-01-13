import express from "express"
import { login, logout, register } from "../auth/auth.service"
import { checkSchema } from "express-validator"
import { registerValidationSchema } from "./validators/registerValidationSchema"
import { loginValidationSchema } from "./validators/loginValidationSchema"

const router = express.Router()

router.post("/register", checkSchema(registerValidationSchema), register)
router.post("/login", checkSchema(loginValidationSchema), login)
router.get("/logout", logout)

export default router
