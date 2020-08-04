const express = require('express')
const routes = express.Router()
const Usuarios = require('../Controllers/usuarios')


routes.get('/usuarios', Usuarios.getAll)

routes.get('/usuarios/:cdusuario', Usuarios.getId)

routes.post('/usuarios', Usuarios.create)

routes.put('/usuarios/:cdusuario', Usuarios.update)

routes.delete('/usuarios/:cdusuario', Usuarios.remove)


module.exports = routes