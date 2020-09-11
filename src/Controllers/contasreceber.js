const sequelize = require('../Database/connection')
const { QueryTypes } = require('sequelize');


const getContasReceber = async (req, res) => {
    try {

        scriptcontasreceber = 'select t.cdtitulo,t.emissao,t.vencimento,' +
            'c.nome,c.fantasia,c.cdcliente,c.manutencao,t.cdrevenda,' +
            '(select nome from usuarios where cdusuario=revenda)revenda,' +
            't.obs,t.total,t.situacao' +
            ' from contasreceber t,clientes c where t.cdcliente=c.cdcliente'

        scripttotalreceber = 'select sum(total)total from contasreceber where cdtitulo>0'

        if (!!req.query.situacao) {
            const Situacao = JSON.stringify(req.query.situacao)
            scriptcontasreceber = scriptcontasreceber + ' and t.situacao=' + Situacao
            scripttotalreceber = scripttotalreceber + ' and situacao=' + Situacao
        }

        if (!!req.query.cdrevenda) {
            const Revenda = req.query.cdrevenda
            scriptcontasreceber = scriptcontasreceber + ' and t.cdrevenda=' + Revenda
            scripttotalreceber = scripttotalreceber + ' and cdrevenda=' + Revenda
        }

        scriptcontasreceber = scriptcontasreceber + ' order by t.cdtitulo desc'

        contasreceber = await sequelize.
            query(scriptcontasreceber, { type: QueryTypes.SELECT })
        totalreceber = await sequelize.
            query(scripttotalreceber, { type: QueryTypes.SELECT })

        return res.json({
            total: totalreceber,
            titulos: contasreceber
        })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const postQuitar = async (req, res) => {
    try {
        const titulos = req.body.titulos
        scriptquitar = `update contasreceber set pago=total,situacao='PAGO' where cdtitulo in (${titulos})`
        await sequelize.
            query(scriptquitar, { type: QueryTypes.UPDATE })
        return res.json({ message: 'Títulos Quitados com Sucesso' })

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

}

module.exports = {
    getContasReceber, postQuitar
}
