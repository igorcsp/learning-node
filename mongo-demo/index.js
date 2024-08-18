const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connnect to Mongo DB', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema) // class

async function createCourse() {
    const course = new Course({
        name: 'React Course',
        author: 'Igor',
        tags: ['react', 'frontend'],
        isPublished: true
    })

    const result = await course.save()
    console.log(result)
}

createCourse()

/*

CLI simple commands

mongosh

show dbs

use playground
db.courses.find().pretty()

*/