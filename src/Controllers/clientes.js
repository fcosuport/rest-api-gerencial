const sequelize = require('../Database/connection')
const { QueryTypes } = require('sequelize');
const Clientes = require('../Models/clientes')


const getAll = async (req, res) => {
    try {

        scriptclientes = 'select* from clientes where cdcliente>0'

        if (!!req.query.revenda) {
            scriptclientes = scriptclientes + ' and revenda=' + req.query.revenda
        }

        if (!!req.query.manutencao) {
            const manutencao = JSON.stringify(req.query.manutencao)
            scriptclientes = scriptclientes + ' and manutencao=' + manutencao
        }

        if (!!req.query.cnpj) {
            const cnpj = JSON.stringify(req.query.cnpj)
            scriptclientes = scriptclientes + ' and cnpj_cpf=' + cnpj
        }

        if (!!req.query.nome) {
            const _nome = req.query.nome + '%'
            const nome = JSON.stringify(_nome)
            console.log(nome)
            scriptclientes = scriptclientes + ' and nome like ' + nome
        }

        if (!!req.query.fantasia) {
            const _fantasia = req.query.fantasia + '%'
            const nome = JSON.stringify(_fantasia)
            console.log(nome)
            scriptclientes = scriptclientes + ' and nome like ' + nome
        }

        clientes = await sequelize.
            query(scriptclientes, { type: QueryTypes.SELECT })
        return res.json(clientes)

    } catch (err) {
        return res.status(400).json({ error: err.message })
    }

    /*try {
        const clientes = await Clientes.findAll()
        return res.json(clientes)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }*/
}

const getId = async (req, res) => {
    try {
        //const cliente = await Clientes.findOne({ where: req.params });
        const cliente = await Clientes.findByPk(req.params.cdcliente);
        return res.json(cliente)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}


const create = async (req, res) => {
    try {
        await Clientes.create(req.body);

        return res.json({ message: 'Cliente Cadastrado com Sucesso!!' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const update = async (req, res) => {
    try {
        await Clientes.update(req.body, { where: req.params });

        return res.json({ message: 'Cliente Atualizado com Sucesso!!' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const remove = async (req, res) => {
    try {
        await Clientes.destroy({ where: req.params });

        return res.json({ message: 'Cliente Excluido com Sucesso!!' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


module.exports = {
    getAll, getId, create, update, remove
}
