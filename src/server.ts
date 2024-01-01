import express from "express"
import AuthController from "./auth/Auth.controller"
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 3500

const app = express()

// json and cookie parser middlewares
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/auth", AuthController)

app.listen(3500, () => {
  console.log(`Server is running on port ${PORT}`)
})
