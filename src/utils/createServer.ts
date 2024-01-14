import cookieParser from "cookie-parser"
import express from "express"
import AuthController from "../auth/auth.controller"
import BooksController from "../books/books.controller"

const createServer = () => {
  const app = express()

  // json and cookie parser middlewares
  app.use(express.json({ limit: "50mb" }))
  app.use(cookieParser())

  //routes
  app.use("/auth", AuthController)
  app.use("/books", BooksController)

  return app
}

export default createServer
