const Produtos = require('../Models/produtos')


const getAll = async (req, res) => {
    try {
        const produtos = await Produtos.findAll()
        return res.json(produtos)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const getId = async (req, res) => {
    try {
        //console.log(req.params.cdproduto)
        const produto = await Produtos.findOne({ where: req.params });
        return res.json(produto)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}


const create = async (req, res) => {
    try {
        await Produtos.create(req.body);

        return res.json({ message: 'Produto Cadastrado com Sucesso!!' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const update = async (req, res) => {
    try {
        await Produtos.update(req.body, { where: req.params });

        return res.json({ message: 'Produto Atualizado com Sucesso!!' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const remove = async (req, res) => {
    try {
        await Produtos.destroy({ where: req.params });

        return res.json({ message: 'Produto Excluido com Sucesso!!' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


module.exports = {
    getAll, getId, create, update, remove
}


