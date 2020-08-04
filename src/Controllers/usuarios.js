const Usuarios = require('../Models/usuarios')


const getAll = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll()
        return res.json(usuarios)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const getId = async (req, res) => {
    try {
        //const usuario = await Usuarios.findOne({ where: req.params });
        const usuario = await Usuarios.findByPk(req.params.cdusuario);
        return res.json(usuario)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}


const create = async (req, res) => {
    try {
        await Usuarios.create(req.body);

        return res.json({ message: 'Usuario Cadastrado com Sucesso!!' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const update = async (req, res) => {
    try {
        console.log(req.params)
        console.log(req.body)
        await Usuarios.update(req.body, { where: req.params });

        return res.json({ message: 'Usuario Atualizado com Sucesso!!' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const remove = async (req, res) => {
    try {
        await Usuarios.destroy({ where: req.params });

        return res.json({ message: 'Usuario Excluido com Sucesso!!' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


module.exports = {
    getAll, getId, create, update, remove
}
