const sequelize = require('../Database/connection')
const { QueryTypes } = require('sequelize')

const getLiberacoes = async (req, res) => {
    try {

        scriptliberacoes = 'select L.CDLIBERACAO,L.DATA,L.CDCLIENTE,' +
            'L.CDUSUARIO,L.SERIALHD,L.CDPRODUTO,' +
            '(select nome from USUARIOS where CDUSUARIO=L.cdusuario)USUARIO,' +
            '(select descricao from PRODUTOS where CDPRODUTO=L.CDPRODUTO)PRODUTO,' +
            'C.NOME,C.FANTASIA from LIBERACOES L,CLIENTES C' +
            ' where L.CDCLIENTE=C.CDCLIENTE and L.CDCLIENTE=' + req.params.cdcliente +
            ' order by data desc'

        liberacoes = await sequelize.
            query(scriptliberacoes, { type: QueryTypes.SELECT })
        return res.json(liberacoes)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

module.exports = {
    getLiberacoes
}
