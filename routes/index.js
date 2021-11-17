const express = require('express')

//routes
const routerUsers = require('./user.route')
const routerAuth = require('./auth.route')


function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1', router)

    router.use('/users', routerUsers)
    router.use('/auth', routerAuth)
}

module.exports = routerApi
