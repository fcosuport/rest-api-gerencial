const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../Database/connection')
const bcrypt = require('bcryptjs');

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
            const salt = bcrypt.genSaltSync()
            usuarios.senha = bcrypt.hashSync(usuarios.senha, salt);
        },
        beforeUpdate: (usuarios) => {
            const salt = bcrypt.genSaltSync()
            usuarios.senha = bcrypt.hashSync(usuarios.senha, salt);
        }
    },
})

module.exports = Usuarios