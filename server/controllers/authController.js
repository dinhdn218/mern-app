const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = {
  /**
   * @route [GET] api/auth/
   * @desc Check if user is logged in
   * @access Public
   */
  async check(req, res) {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
      return res.json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  /**
   * @route [POST] api/auth/register
   * @desc Register user
   * @access Public
   */
  async register(req, res) {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing username and/or password",
      });
    }

    try {
      // Check for existing user
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "Username already existing",
        });
      }
      // All good
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      // Return result
      return res.json({
        success: true,
        message: "User created successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  /**
   * @route [POST] api/auth/login
   * @desc Login user
   * @access Public
   */
  async login(req, res) {
    const { username, password } = req.body;
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing username and/or password",
      });
    }

    try {
      // Check for existing user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
        });
      }
      // Username found
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
        });
      }
      // All good => Return token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      // Create user response (exclude key password)
      const userResponse = await User.findById(user._id).select("-password");
      return res.json({
        success: true,
        message: "User logged in successfully",
        accessToken,
        user: userResponse,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

module.exports = authController;
