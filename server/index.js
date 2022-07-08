const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const port = 3000

async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('connect success')
  } catch (error) {
    console.log('connect fail')
  }
}

connectDb()

app.get('/', (req, res) => res.send('Hello world'))
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})
