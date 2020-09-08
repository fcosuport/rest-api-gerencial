const express = require('express')
const routes = express.Router()
const Estados = require('../Controllers/estados')

const authMiddleware = require('../middlewares/auth')

routes.use(authMiddleware)


routes.get('/estados', Estados.getAll)


module.exports = routes