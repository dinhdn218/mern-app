const authRouter = require('../routes/auth.route')
const siteRouter = require('../routes/site.route')

function route(app) {
  app.use('/api/auth', authRouter)

  app.use('/', siteRouter)
}

module.exports = route
