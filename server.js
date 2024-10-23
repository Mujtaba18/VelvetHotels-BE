const express = require("express")
const path = require("path")
const logger = require("morgan")
const cors = require("cors")

const PORT = process.env.PORT || 3001

const db = require("./db")

const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// hotel routes
const HotelRouter = require("./routes/Hotel")

// user auth routes
const AuthRouter = require("./routes/AuthRouter")

const amenityRouter = require("./routes/amenity")

const ProfileRouter = require("./routes/Profile")

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/auth", AuthRouter)
app.use("/amenities", amenityRouter)
app.use("/profile", ProfileRouter)
app.use("/hotels", HotelRouter)


app.use("/", (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
