const sequelize = require('../Database/connection')
const { QueryTypes } = require('sequelize');


const getContasReceber = async (req, res) => {
    try {

        scriptcontasreceber = 'select t.cdtitulo,t.emissao,t.vencimento,' +
            'c.nome,c.fantasia,c.cdcliente,c.manutencao,t.cdrevenda,' +
            '(select nome from usuarios where cdusuario=revenda)revenda,' +
            't.obs,t.total,t.situacao' +
            ' from contasreceber t,clientes c where t.cdcliente=c.cdcliente'

        if (!!req.query.situacao) {
            Situacao = JSON.stringify(req.query.situacao)
            scriptcontasreceber = scriptcontasreceber + ' and t.situacao=' + Situacao
        }

        if (!!req.query.cdrevenda) {
            Revenda = req.query.cdrevenda
            scriptcontasreceber = scriptcontasreceber + ' and t.cdrevenda=' + Revenda
        }

        contasreceber = await sequelize.
            query(scriptcontasreceber, { type: QueryTypes.SELECT })
        return res.json(contasreceber)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

module.exports = {
    getContasReceber
}
