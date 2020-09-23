const sequelize = require('../Database/connection')
const { QueryTypes } = require('sequelize');
const Clientes = require('../Models/clientes')


const getAll = async (req, res) => {
    try {

        //scriptclientes = 'select* from clientes where cdcliente>0'
        scriptclientes = 'select cdcliente,nome,fantasia,cnpj_cpf,valormanutencao,' +
            '(select nome from usuarios where cdusuario=revenda)revenda' +
            ' from clientes where cdcliente>0'

        scripttotalmanutencao = 'select sum(valormanutencao)totalmanutencao from clientes where cdcliente>0'

        if (!!req.query.cdrevenda) {
            scriptclientes = scriptclientes + ' and revenda=' + req.query.cdrevenda
            scripttotalmanutencao = scripttotalmanutencao + ' and revenda=' + req.query.cdrevenda
        }

        if (!!req.query.manutencao) {
            const manutencao = JSON.stringify(req.query.manutencao)
            scriptclientes = scriptclientes + ' and manutencao=' + manutencao
            scripttotalmanutencao = scripttotalmanutencao + ' and manutencao=' + manutencao
        }

        if (!!req.query.bloquearsistema) {
            const bloquearsistema = JSON.stringify(req.query.bloquearsistema)
            scriptclientes = scriptclientes + ' and bloquearsistema=' + bloquearsistema
            scripttotalmanutencao = scripttotalmanutencao + ' and bloquearsistema=' + bloquearsistema
        }

        if (!!req.query.inativo) {
            const inativo = JSON.stringify(req.query.inativo)
            scriptclientes = scriptclientes + ' and inativo=' + inativo
            scripttotalmanutencao = scripttotalmanutencao + ' and inativo=' + inativo
        }

        if (!!req.query.cnpj) {
            const cnpj = JSON.stringify(req.query.cnpj)
            scriptclientes = scriptclientes + ' and cnpj_cpf=' + cnpj
            scripttotalmanutencao = scripttotalmanutencao + ' and cnpj_cpf=' + cnpj
        }

        if (!!req.query.codigo) {
            const codigo = JSON.stringify(req.query.codigo)
            scriptclientes = scriptclientes + ' and cdcliente=' + codigo
            scripttotalmanutencao = scripttotalmanutencao + ' and cdcliente=' + codigo
        }

        if (!!req.query.nome) {
            const _nome = req.query.nome + '%'
            const nome = JSON.stringify(_nome)
            scriptclientes = scriptclientes + ' and nome like ' + nome
            scripttotalmanutencao = scripttotalmanutencao + ' and nome like ' + nome
        }

        if (!!req.query.fantasia) {
            const _fantasia = req.query.fantasia + '%'
            const nome = JSON.stringify(_fantasia)
            scriptclientes = scriptclientes + ' and fantasia like ' + nome
            scripttotalmanutencao = scripttotalmanutencao + ' and fantasia like ' + nome
        }

        scriptclientes = scriptclientes + ' order by cdcliente desc'

        clientes = await sequelize.
            query(scriptclientes, { type: QueryTypes.SELECT })
        totalmanutencao = await sequelize.
            query(scripttotalmanutencao, { type: QueryTypes.SELECT })

        return res.json({
            totalmanutencao: totalmanutencao,
            clientes: clientes
        })

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

const getCnpj = async (req, res) => {
    try {
        const cliente = await Clientes.findOne({ where: req.params });
        return res.json(cliente)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const getBuscarcdCliente = async (req, res) => {
    try {
        const cnpj = JSON.stringify(req.params.cnpj)
        script = 'select cdcliente from clientes where cnpj_cpf=' + cnpj
        cdcodigo = await sequelize.query(script, { type: QueryTypes.SELECT })
        return res.json(cdcodigo)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const getVerificarLicenca = async (req, res) => {
    try {
        script = 'select cnpj_cpf,bloquearsistema from clientes where cdcliente=' + req.params.cdcliente
        cliente = await sequelize.query(script, { type: QueryTypes.SELECT })
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
        console.log(req.body);
        await Clientes.update(req.body, { where: req.params });

        return res.json({ message: 'Cliente Atualizado com Sucesso!!' });
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({ error: err.message });
    }
}

const remove = async (req, res) => {
    try {
        //await Clientes.destroy({ where: req.params });

        //return res.json({ message: 'Cliente Excluido com Sucesso!!' });
        return res.json({ message: 'Função não Habilitada!!' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


module.exports = {
    getAll, getId, getCnpj, getBuscarcdCliente, getVerificarLicenca, create, update, remove
}
