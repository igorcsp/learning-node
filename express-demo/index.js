const debug = require('debug')('app:startup')
const config = require('config')
const helmet = require('express')
const logger = require('./middleware/logger')
const morgan = require('morgan')
const express = require('express')
const app = express()
const courses = require('./routes/courses')
const home = require('./routes/home')

app.set('view engine', 'pug')
app.set('views', './views') // default

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet());

app.use('/', home)
app.use('/api/courses', courses)

// Configuration
console.log('Aplication Name: ' + config.get('name'))
console.log('Mail Server: ' + config.get('mail.host'))
console.log('Mail Password: ' + config.get('mail.password'))

console.log(logger)

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    debug('Morgan enabled...')
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
