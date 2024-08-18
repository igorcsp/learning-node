const Joi = require('joi')
const express = require('express')
const router = express.Router()

const genres = [
    { id: 1, genre: "horror" },
    { id: 2, genre: "comedy" },
    { id: 3, genre: "action" },
]

function validateInput(genre) {
    const schema = Joi.object({
        genre: Joi.string().min(3).max(45).required()
    })
    return schema.validate({ genre: genre })
}


router.get('/', (req, res) => {
    res.send(genres)
})


router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send(`Genre id of ${parseInt(req.params.id)} not found`)

    res.send(genre)
})

router.post('/', (req, res) => {
    const { error } = validateInput(req.body.genre)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }

    genres.push(genre)
    res.send(genre)
})

router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send(`Genre id of ${parseInt(req.params.id)} not found`)

    const { error } = validateInput(req.body.genre)
    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name;
    res.send(genre);
})

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send(`Genre id of ${parseInt(req.params.id)} not found`)

    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.send(genre)
})

module.exports = router