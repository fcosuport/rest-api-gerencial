const express = require('express')
const routes = express.Router()
const Liberacoes = require('../Controllers/liberacoes')

const authMiddleware = require('../middlewares/auth')

routes.use(authMiddleware)


routes.get('/liberacoes/:cdcliente', Liberacoes.getLiberacoes)

module.exports = routes