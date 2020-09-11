const express = require('express')
const routes = express.Router()
const ContasReceber = require('../Controllers/contasreceber')

const authMiddleware = require('../middlewares/auth')

routes.use(authMiddleware)


routes.get('/contasreceber', ContasReceber.getContasReceber)

routes.post('/contasreceber/quitar', ContasReceber.postQuitar)



module.exports = routes