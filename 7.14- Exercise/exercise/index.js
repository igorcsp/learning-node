const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongo-exercises')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect, Error', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, Default: Date.now },
    price: Number,
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

/*
get all the published courses tha are $15 or more,
or have the word 'by' in their title
*/

async function getCourses() {
    return await Course
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ])
}

async function run() {
    const courses = await getCourses()
    console.log(courses)
}

run()