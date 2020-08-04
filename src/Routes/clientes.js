const express = require('express')
const routes = express.Router()
const Clientes = require('../Controllers/clientes')


routes.get('/clientes', Clientes.getAll)

routes.get('/clientes/:cdcliente', Clientes.getId)

routes.post('/clientes', Clientes.create)

routes.put('/clientes/:cdcliente', Clientes.update)

routes.delete('/clientes/:cdcliente', Clientes.remove)


module.exports = routes