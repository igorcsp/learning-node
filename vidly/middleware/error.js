const winston = require("winston/lib/winston/config")

module.exports = function (err, req, res, next) {
    winston.error(err.message)

    // hierarquia de erros
    // error
    // warn
    // info
    // verbose
    // debug
    // silly
    
    res.status(500).send(`Something failed.`)
}