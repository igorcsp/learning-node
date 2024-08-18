function log(req, res, next) {
    console.log('Logging...')
    next()
}

function auth(req, res, next) {
    console.log('Authenticanting...')
    next()
}

module.exports.log = log
module.exports.auth = auth