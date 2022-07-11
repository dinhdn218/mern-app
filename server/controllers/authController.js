const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authController = {
  /**
   * @route [POST] api/auth/register
   * @desc Register use
   * @access Public
   */
  async register(req, res, next) {
    const { username, password } = req.body

    // Simple validation
    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: 'Missing username and/or password',
      })
    }

    try {
      // Check for existing user
      const user = await User.findOne({ username })
      if (user) {
        res.status(400).json({
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
        process.env.ACCESS_TOKEN
      )
      res.json({
        success: true,
        message: 'User created successfully',
        accessToken,
      })
    } catch (error) {}
  },
}

module.exports = authController
