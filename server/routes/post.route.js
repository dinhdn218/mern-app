const express = require('express')
const postController = require('../controllers/postController')
const verifyToken = require('../middleware/auth')
const router = express.Router()

router.post('/', verifyToken, postController.create)

router.get('/', verifyToken, postController.read)

router.put('/:id', verifyToken, postController.update)

router.delete('/:id', verifyToken, postController.delete)

module.exports = router
