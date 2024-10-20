const express = require("express")
const path = require('path');
const logger = require("morgan")
const cors = require("cors")

const PORT = process.env.PORT || 3001

const db = require("./db")

const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// user auth routes
const AuthRouter = require("./routes/AuthRouter")
const amenityRouter = require("./routes/amenity")

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/auth", AuthRouter)
app.use("/amenities", amenityRouter)

app.use("/", (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
