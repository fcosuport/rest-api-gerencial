const express = require('express')
const routes = express.Router()
const Cidades = require('../Controllers/cidades')

const authMiddleware = require('../middlewares/auth')

routes.use(authMiddleware)

routes.get('/cidades', Cidades.getAll)


module.exports = routes