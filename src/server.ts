import express from "express"
import registerRoute from "./routes/api/register"
const PORT = process.env.PORT || 3500

const app = express()

//routes
app.use("/register", registerRoute)

app.listen(3500, () => {
  console.log(`Server is running on port ${PORT}`)
})
