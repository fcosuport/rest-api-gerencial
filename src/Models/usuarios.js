const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../Database/connection')
const bcrypt = require('bcryptjs')

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
}, {
    hooks: {
        beforeCreate: (usuarios) => {
            usuarios.senha = bcrypt.hashSync(usuarios.senha);
        },
        beforeUpdate: (usuarios) => {
            usuarios.senha = bcrypt.hashSync(usuarios.senha);
        },
    },
})

module.exports = Usuarios