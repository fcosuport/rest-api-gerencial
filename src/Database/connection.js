const Sequelize = require('sequelize');

const Config = require('./config');

const connection = new Sequelize(Config);

/*try {
    connection.authenticate();
    console.log('Conectado ao Banco de Dados.');
} catch (error) {
    console.error('Erro ao Conectar ao Banco de Dados:', error);
}*/

module.exports = connection
