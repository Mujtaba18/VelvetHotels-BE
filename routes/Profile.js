const express = require("express")
const multer = require("multer")
const path = require("path")
const User = require("../models/User") // Adjust the path if needed

const router = express.Router()

// Set up storage for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Profile/")
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    filename = Date.now() + ext // Generate unique filename
    cb(null, filename)
  },
})

const upload = multer({ storage: storage })

// Fetch user profile
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordDigest") // Exclude passwordDigest
    console.log(user)
    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }
    res.json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

// Update user profile (with optional file upload)
router.put("/:id", upload.single("profile_picture"), async (req, res) => {
  try {
    const { name, email, age, gender } = req.body
    const profile_picture = req.file
      ? `/Profile/${req.file.filename}`
      : undefined

    const updatedFields = {
      name,
      email,
      age,
      gender,
    }

    if (profile_picture) {
      updatedFields.profile_picture = profile_picture
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true } // Return the updated document
    )

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" })
    }
    res.json(updatedUser)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
