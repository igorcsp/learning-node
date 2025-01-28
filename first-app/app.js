const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello world')
        res.end()
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]))
        res.end()

    }
})
const port = 3000

server.on('connection', (socket) => {
    console.log('New connection...')
})
server.listen(port)

console.log(`Listening on port ${port}...`)
