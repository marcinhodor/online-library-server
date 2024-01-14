import createServer from "./utils/createServer"

const PORT = process.env.PORT || 3500

const app = createServer()

app.listen(3500, () => {
  console.log(`Server is running on port ${PORT}`)
})
