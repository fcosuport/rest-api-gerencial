const Usuarios = require('../Models/usuarios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function generateToken(params = {}) {
    return jwt.sign(params, secret, {
        expiresIn: 20000,
    })
}


const login = async (req, res) => {
    try {
        const { nome, senha } = req.body
        const usuario = await Usuarios.findOne({ where: { nome } })

        if (!usuario) {
            return res.json({ status: '100', message: 'Usuario ou Senha incorreto!' })
        }

        if (!bcrypt.compareSync(senha, usuario.senha)) {
            return res.json({ status: '100', message: 'Usuario ou Senha incorreto!' })
        }

        if (usuario.inativo == 'T') {
            return res.json({ status: '100', message: 'Usuario Bloqueado!' })
        }

        usuario.senha = undefined

        const token = generateToken({
            cdusuario: usuario.cdusuario,
            tipousuario: usuario.tipousuario
        });

        return res.status(200).json({
            status: '200',
            message: "Usuário logado com sucesso!",
            usuario, token
        })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}


module.exports = { login }