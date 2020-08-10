const express = require('express')
const routes = express.Router()
const LoginUser = require('../Controllers/login')

routes.post('/login', LoginUser.login)

module.exports = routes