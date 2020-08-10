const Usuarios = require('../Models/usuarios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function generateToken(params = {}) {
    return jwt.sign(params, secret, {
        expiresIn: 70000,
    })
}


const login = async (req, res) => {
    try {
        const { nome, senha } = req.body
        const usuario = await Usuarios.findOne({ where: { nome } })

        if (!usuario) {
            return res.status(400).json({ message: 'Usuario ou Senha incorreto!' })
        }

        if (!bcrypt.compareSync(senha, usuario.senha)) {
            return res.status(400).json({ message: 'Usuario ou Senha incorreto!' })
        }

        if (usuario.inativo == 'T') {
            return res.status(400).json({ message: 'Usuario Bloqueado!' })
        }

        usuario.senha = undefined

        const token = generateToken({
            cdusuario: usuario.cdusuario
        });

        //return res.json(usuario,token)
        return res.status(200).send({
            status: 1,
            message: "Usuário logado com sucesso!",
            usuario, token
        })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}


module.exports = { login }