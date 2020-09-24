const express = require('express')
const routes = express.Router()
const Licenca = require('../Controllers/licenca')

const authMiddleware = require('../middlewares/auth')


routes.use(authMiddleware)


routes.post('/licenca', Licenca.postLicenca)


module.exports = routes