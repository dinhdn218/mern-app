const authRouter = require('../routes/auth.route')
const postRouter = require('../routes/post.route')

function route(app) {
  app.use('/api/auth', authRouter)

  app.use('/api/posts', postRouter)
}

module.exports = route
