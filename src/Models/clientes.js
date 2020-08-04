const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../Database/connection')

const Clientes = sequelize.define('clientes', {
    cdcliente: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    pessoa: DataTypes.STRING,
    nome: DataTypes.STRING,
    fantasia: DataTypes.STRING,
    cnpj_cpf: DataTypes.STRING,
    ie_rg: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numero: DataTypes.STRING,
    cep: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cdcidade: DataTypes.INTEGER,
    cdestado: DataTypes.INTEGER,
    telefones: DataTypes.STRING,
    email: DataTypes.STRING,
    obs: DataTypes.STRING,
    revenda: DataTypes.INTEGER,
    dataalteracao: DataTypes.DATE,
    datacadastro: DataTypes.DATE,
    manutencao: DataTypes.STRING,
    valormanutencao: DataTypes.DECIMAL,
    inativo: DataTypes.STRING,
    bloquearsistema: DataTypes.STRING
})

module.exports = Clientes