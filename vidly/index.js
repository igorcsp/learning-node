const router = require('./routes/genres')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.json())
app.use('/api/genres', router)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}...`))