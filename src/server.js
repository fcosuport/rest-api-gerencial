const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const dotenv = require('dotenv').config()

const PORT = process.env.PORT

require('./Database/connection');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//Rotas
const login = require('./Routes/login')
const clientes = require('./Routes/clientes')
const produtos = require('./Routes/produtos')
const usuarios = require('./Routes/usuarios')
const licenca = require('./Routes/licenca');
const contasreceber = require('./Routes/contasreceber')
const liberacoes = require('./Routes/liberacoes')

app.use(login)
app.use(clientes)
app.use(produtos)
app.use(usuarios)
app.use(licenca)
app.use(contasreceber)
app.use(liberacoes)


app.get("/", (req, res) => {
    res.json({ messenge: 'Bem Vindo a Rest Api Gerencial' })
});


app.listen(PORT, () => {
    console.log('Servidor Rodando na porta ' + PORT)
});