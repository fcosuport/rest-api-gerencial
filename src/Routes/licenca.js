const express = require('express')
const routes = express.Router()
const Licenca = require('../Controllers/licenca')

routes.post('/licenca', Licenca.postLicenca)


module.exports = routes