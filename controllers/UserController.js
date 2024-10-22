const User = require("../models/User")

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
