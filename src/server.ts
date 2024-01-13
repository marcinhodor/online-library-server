import express from "express"
import AuthController from "./auth/auth.controller"
import BooksController from "./books/books.controller"
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 3500

const app = express()

// json and cookie parser middlewares
app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())

//routes
app.use("/auth", AuthController)
app.use("/books", BooksController)

app.listen(3500, () => {
  console.log(`Server is running on port ${PORT}`)
})
