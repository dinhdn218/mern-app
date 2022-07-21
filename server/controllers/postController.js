const jwt = require('jsonwebtoken')
const Post = require('../models/Post')

const postController = {
  /**
   * @route [POST] api/posts
   * @desc create post
   * @access Private
   */
  async create(req, res) {
    const { title, description, url, status } = req.body
    // Simple validation
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: 'Title is required' })
    }
    try {
      const newPost = new Post({
        title,
        description,
        url: url.startsWith('https://') ? url : `https://${url}`,
        status: status || 'TO LEARN',
        user: req.userId,
      })

      await newPost.save()

      return res.json({
        success: true,
        message: 'Happy learning!!!',
        post: newPost,
      })
    } catch (error) {
      console.log('error: ', error)
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      })
    }
  },

  /**
   * @route [GET] api/posts
   * @desc Get posts
   * @access Private
   */
  async read(req, res) {
    try {
      const posts = await Post.find({ user: req.userId }).populate('user', [
        'username',
      ])
      return res.json({ success: true, posts })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      })
    }
  },
}

module.exports = postController
