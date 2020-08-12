const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).send({ error: 'Nenhum Token Enviado!!' })
    }
    const parts = authHeader.split(' ')

    if (!parts.length == 2) {
        return res.status(401).send({ error: 'Token error!' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token mau Formatado!!' })
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalido!!' })

        UserLogado = decoded.cdusuario

        return next();
    });

};