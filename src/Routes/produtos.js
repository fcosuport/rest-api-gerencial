const express = require('express')
const routes = express.Router()
const Produtos = require('../Controllers/produtos')


routes.get('/produtos', Produtos.getAll)

routes.get('/produtos/:cdproduto', Produtos.getId)

routes.post('/produtos', Produtos.create)

routes.put('/produtos/:cdproduto', Produtos.update)

routes.delete('/produtos/:cdproduto', Produtos.remove)


module.exports = routes