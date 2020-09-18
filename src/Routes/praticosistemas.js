const express = require('express')
const routes = express.Router()
const Clientes = require('../Controllers/clientes')

routes.get('/clientes/buscarcdcliente/:cnpj', Clientes.getBuscarcdCliente)

routes.get('/clientes/verificarlicenca/:cdcliente', Clientes.getVerificarLicenca)

module.exports = routes