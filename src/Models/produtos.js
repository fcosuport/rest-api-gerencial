const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../Database/connection')

const Produtos = sequelize.define('produtos', {
    cdproduto: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idaplicacao: DataTypes.STRING,
    descricao: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    gerartitulo: DataTypes.STRING,
    inativo: DataTypes.STRING
})

module.exports = Produtos