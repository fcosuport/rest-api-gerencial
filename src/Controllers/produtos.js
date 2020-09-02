const Produtos = require('../Models/produtos')


const getAll = async (req, res) => {
    try {

        if (!!req.query.inativo) {
            const produtos = await Produtos.findAll({ where: req.query })
            return res.json(produtos)
        } else {
            const produtos = await Produtos.findAll()
            return res.json(produtos)
        }

    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const getId = async (req, res) => {
    try {
        //const produto = await Produtos.findOne({ where: req.params });
        const produto = await Produtos.findByPk(req.params.cdproduto);
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
        //await Produtos.destroy({ where: req.params });

        //return res.json({ message: 'Produto Excluido com Sucesso!!' });
        return res.json({ message: 'Função não Habilitada!!' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


module.exports = {
    getAll, getId, create, update, remove
}


