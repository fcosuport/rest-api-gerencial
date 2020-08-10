const Usuarios = require('../Models/usuarios')
const bcrypt = require('bcryptjs')


const login = async (req, res) => {
    try {
        const { nome, senha } = req.body
        const usuario = await Usuarios.findOne({ where: { nome } })

        if (!usuario) {
            return res.status(400).json({ message: 'Email ou Senha incorreto!' })
        }

        if (!bcrypt.compareSync(senha, usuario.senha)) {
            return res.status(400).json({ message: 'Email ou Senha incorreto!' })
        }

        if (usuario.inativo == 'T') {
            return res.status(400).json({ message: 'Usuario Bloqueado!' })
        }

        usuario.senha = undefined

        return res.json(usuario)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}


module.exports = { login }