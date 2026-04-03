import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// ✅ REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" })
    }

    const normalizedEmail = email.toLowerCase().trim()

    const existing = await User.findOne({ email: normalizedEmail })
    if (existing) {
      return res.status(400).json({ message: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password.trim(), salt)

    const user = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role
    })

    await user.save()

    res.status(201).json({ message: "Registered successfully" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ✅ LOGIN
export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    email = email.toLowerCase().trim()

    const user = await User.findOne({ email })


    const isMatch = await bcrypt.compare(password.trim(), user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      message: "Login successful",
      token
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ✅ GET PROFILE
export const getMe = async (req, res) => {
  try {
    res.json(req.user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ✅ UPDATE PROFILE (TOKEN BASED)
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    ).select("-password")

    res.json({ message: "Profile updated", user })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}