
const Liberacoes = require('../Models/liberacoes')
const ContasReceber = require('../Models/contasreceber')
const Produtos = require('../Models/produtos')
const Clientes = require('../Models/clientes')


const postLicenca = async (req, res) => {
    try {

        const cdclienteReq = req.body.cdcliente
        const cdprodutoReq = req.body.cdproduto
        const tipoReq = req.body.tipoliberacao
        const chaveReq = req.body.chave
        const dataReq = req.body.data

        const chave = new Buffer.from(chaveReq, 'base64').toString('utf-8')
        const hd = chave.substring(0, 8)

        const clientes = await Clientes.findByPk(cdclienteReq)

        if (clientes.cnpj_cpf != chave.substring(16)) {
            return res.status(400).
                json({ message: 'CNPJ da chave diferente do Cliente' })

        }

        const produtos = await Produtos.findByPk(cdprodutoReq)

        if (produtos.idaplicacao != chave.substring(8, 16)) {
            return res.status(400)
                .json({ message: 'Módulo da chave difere do informado' })
        }

        if (tipoReq == 1) {
            dataLicenca = dataReq.replace(/\//g, '')
            //console.log(dataLicenca)
        }

        /*
        const idaplic = chave.substring(8, 16)
        const cnpj = chave.substring(16)
        */

        const dataAtual = new Date();
        const dia = dataAtual.getDate()
        const mes = dataAtual.getMonth() + 1
        const ano = dataAtual.getFullYear()
        const somadata = (dia + mes + ano)
        const diminuidata = (ano - mes - dia)


        novoidaplic = ((parseInt(produtos.idaplicacao) +
            parseInt(somadata)) +
            (parseInt(produtos.idaplicacao) * 3) +
            (parseInt(produtos.idaplicacao) -
                parseInt(diminuidata)))

        novachave = ("0000" + novoidaplic).slice(-10) + clientes.cnpj_cpf + hd + tipoReq

        if (tipoReq == 1) {
            novachave = novachave + dataLicenca
        }

        const chavelicenca = new Buffer.from(novachave).toString('base64');


        //Gravando informações no Banco de Dados

        try {
            await Liberacoes.create({
                cdcliente: cdclienteReq,
                cdusuario: 1,
                serialhd: hd,
                cdproduto: produtos.cdproduto,
                chaveliberacao: chavelicenca,
                data: dataAtual
            })
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            await ContasReceber.create({
                cdcliente: clientes.cdcliente,
                emissao: dataAtual,
                vencimento: dataAtual + 5,
                total: produtos.valor,
                pago: 0,
                cdrevenda: 1,
                cdpagamento: 2,
                parcelas: 1,
                situacao: 'ABERTO',
                obs: produtos.descricao,
                cdgrupo: 1,
            })
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }


        return res.json({ message: chavelicenca })

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

module.exports = {
    postLicenca
}