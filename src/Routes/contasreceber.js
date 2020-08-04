const express = require('express')
const routes = express.Router()
const ContasReceber = require('../Controllers/contasreceber')


routes.get('/contasreceber', ContasReceber.getContasReceber)



module.exports = routes