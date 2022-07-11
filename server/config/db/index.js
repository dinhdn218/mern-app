const mongoose = require('mongoose')
require('dotenv').config()

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('connect success')
  } catch (error) {
    console.log('connect fail')
  }
}

module.exports = { connect }
