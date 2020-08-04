const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../Database/connection')

const Liberacoes = sequelize.define('liberacoes', {
    cdliberacao: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    cdcliente: DataTypes.INTEGER,
    cdusuario: DataTypes.INTEGER,
    serialhd: DataTypes.STRING,
    cdproduto: DataTypes.INTEGER,
    chaveliberacao: DataTypes.STRING,
    data: DataTypes.DATE
})

module.exports = Liberacoes