import express from "express"
const PORT = process.env.PORT || 3500

const app = express()

app.listen(3500, () => {
  console.log(`Server is running on port ${PORT}`)
})
