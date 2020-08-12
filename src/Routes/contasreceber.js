const express = require('express')
const routes = express.Router()
const ContasReceber = require('../Controllers/contasreceber')

const authMiddleware = require('../middlewares/auth')

routes.use(authMiddleware)


routes.get('/contasreceber', ContasReceber.getContasReceber)



module.exports = routes