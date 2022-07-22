const jwt = require('jsonwebtoken')
const Post = require('../models/Post')

const postController = {
  /**
   * @route [POST] api/posts
   * @desc Create post
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

  /**
   * @route [PUT] api/posts/:id
   * @desc Update post
   * @access Private
   */
  async update(req, res) {
    const { title, description, url, status } = req.body
    // Simple validation
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: 'Title is required' })
    }
    try {
      const update = {
        title,
        description: description || '',
        url: url ? (url.startsWith('https://') ? url : `https://${url}`) : '',
        status: status || 'TO LEARN',
        user: req.userId,
      }

      const filter = { _id: req.params.id, user: req.userId }

      const updatedPost = await Post.findOneAndUpdate(filter, update, {
        // new: true => trả về object mới sau khi update, nếu không có option này thì sẽ trả về object cũ (trc khi update)
        new: true,
      })

      // Post not found or user not authorised
      if (!updatedPost) {
        return res.status(401).json({
          success: false,
          message: 'Post not found or user not authorised',
        })
      }

      return res.json({
        success: true,
        message: 'Excellent progress!',
        post: updatedPost,
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
   * @route [DELETE] api/posts/:id
   * @desc Delete post
   * @access Private
   */
  async delete(req, res) {
    try {
      const condition = { _id: req.params.id, user: req.userId }
      const deletedPost = await Post.findOneAndDelete(condition)

      // Post not found or user not authorised
      if (!deletedPost) {
        return res.status(401).json({
          success: false,
          message: 'Post not found or user not authorised',
        })
      }

      return res.json({
        success: true,
        message: 'So sad!',
        post: deletedPost,
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

module.exports = postController
