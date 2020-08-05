const express = require('express')
const routes = express.Router()
const Liberacoes = require('../Controllers/liberacoes')

routes.get('/liberacoes/:cdcliente', Liberacoes.getLiberacoes)

module.exports = routes