const express = require("express");
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/", verifyToken, authController.check);

module.exports = router;
