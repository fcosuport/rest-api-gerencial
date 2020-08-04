const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../Database/connection')

const Usuarios = sequelize.define('usuarios', {
    cdusuario: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    inativo: DataTypes.STRING,
    tipousuario: DataTypes.STRING
})

module.exports = Usuarios