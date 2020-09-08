const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const dotenv = require('dotenv').config()
const cors = require('cors')

const PORT = process.env.PORT

require('./Database/connection')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())


//Rotas
const login = require('./Routes/login')
const clientes = require('./Routes/clientes')
const produtos = require('./Routes/produtos')
const usuarios = require('./Routes/usuarios')
const licenca = require('./Routes/licenca');
const contasreceber = require('./Routes/contasreceber')
const liberacoes = require('./Routes/liberacoes')
const cidades = require('./Routes/cidades')
const estados = require('./Routes/estados')


app.use(login)
app.use(clientes)
app.use(produtos)
app.use(usuarios)
app.use(licenca)
app.use(contasreceber)
app.use(liberacoes)
app.use(cidades)
app.use(estados)



app.get("/", (req, res) => {
    res.json({ messenge: 'Bem Vindo a Rest Api Gerencial' })
});


app.listen(PORT, () => {
    console.log('Servidor Rodando na porta ' + PORT)
});