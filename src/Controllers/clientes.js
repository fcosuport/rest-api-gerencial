const Clientes = require('../Models/clientes')


const getAll = async (req, res) => {
    try {
        const clientes = await Clientes.findAll()
        return res.json(clientes)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
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
