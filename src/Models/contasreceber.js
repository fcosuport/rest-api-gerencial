const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../Database/connection')

const ContasReceber = sequelize.define('contasreceber', {
    cdtitulo: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    cdcliente: DataTypes.INTEGER,
    emissao: DataTypes.DATE,
    vencimento: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    pago: DataTypes.DECIMAL,
    cdrevenda: DataTypes.INTEGER,
    cdpagamento: DataTypes.INTEGER,
    parcelas: DataTypes.INTEGER,
    situacao: DataTypes.STRING,
    obs: DataTypes.STRING,
    cdgrupo: DataTypes.INTEGER

},
    { freezeTableName: true }
)

module.exports = ContasReceber