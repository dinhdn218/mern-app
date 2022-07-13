const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authController = {
  /**
   * @route [POST] api/auth/register
   * @desc Register user
   * @access Public
   */
  async register(req, res) {
    const { username, password } = req.body

    // Simple validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing username and/or password',
      })
    }

    try {
      // Check for existing user
      const user = await User.findOne({ username })
      if (user) {
        return res.status(400).json({
          success: false,
          message: 'Username already existing',
        })
      }
      // All good
      const hashedPassword = await argon2.hash(password)
      const newUser = new User({ username, password: hashedPassword })
      await newUser.save()

      // Return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      )
      return res.json({
        success: true,
        message: 'User created successfully',
        accessToken,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      })
    }
  },

  /**
   * @route [POST] api/auth/login
   * @desc Login user
   * @access Public
   */
  async login(req, res) {
    const { username, password } = req.body
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing username and/or password',
      })
    }

    try {
      // Check for existing user
      const user = await User.findOne({ username })
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect username or password',
        })
      }
      // Username found
      const passwordValid = await argon2.verify(user.password, password)
      if (!passwordValid) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect username or password',
        })
      }
      // All good => Return token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      )
      return res.json({
        success: true,
        message: 'User logged in successfully',
        accessToken,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      })
    }
  },
}

module.exports = authController
