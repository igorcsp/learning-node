const mongoose = require('mongoose')
const winston = require('winston');
const config = require('config')

module.exports = function () {
    const db = config.get('db')
    // Conexão com o MongoDB
    mongoose.connect(db)
        .then(() => winston.info(`Connected to ${db}...`))
    // .catch(err => winston.error(`Could not connect to MongoDB... Erro: ${err}`))
}