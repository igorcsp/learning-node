const express = require('express')
const Joi = require('joi')

const app = express()

app.use(express.json())

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(45)
            .required(),
    })

    return schema.validate({ name: course })
}

let courses = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'Javascript' },
]

// GET
app.get('/', (req, res) => {
    res.send('Home page')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send(`The course of the given id of ${req.params.id} was not found`)
    res.send(course)
})

// POST
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body.name)

    if (error) return res.status(400).send(error.details[0].message)

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

// PUT
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send(`Course of id ${req.params.id} not found`)

    const { error } = validateCourse(req.body.name)

    if (error) return res.status(400).send(error.details[0].message)


    course.name = req.body.name
    res.send(course)
})

// DELETE
// my first solution
// app.delete('/api/courses/:id', (req, res) => {
//     const newArrCourses = courses.filter((c) => c.id !== parseInt(req.params.id))

//     if (parseInt(req.params.id) !== courses.length) return res.status(404).send("ID not found")

//     courses = [...newArrCourses]
//     res.send(newArrCourses)
// })

// course solution
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send(`Course of id ${req.params.id} not found`)

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
// para configurar a variável de ambiente no CLI > `export PORT=5000` no BASH e `set PORT=5000` no windowns
