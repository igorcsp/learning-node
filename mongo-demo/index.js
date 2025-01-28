const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connnect to Mongo DB', err))

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255 },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        resolve(result);
                    }, 3000);
                });
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    price: {
        type: Number,
        required: function () { return this.isPublished },
        min: 10,
        max: 200
    },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema) // class

async function createCourse() {
    const course = new Course({
        name: 'React Course',
        category: '-',
        author: 'Igor',
        tags: null,
        isPublished: true,
        price: 15
    })
    try {
        const result = await course.save()
        console.log(result)
    } catch (ex) {
        for (const field in ex.errors) {
            console.log(`${ex.errors[field].name}: ${ex.errors[field].message}`)
            // console.log(ex.errors[field].message)
        }
    }
}

async function getCourse() {
    // COMPARISON OPERATORS
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // LOGICAL OPERATORS
    // or & and

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        // REGULAR QUERY
        // .find({ author: 'Igor', isPublished: true })

        // COMPARISON OPERATORS
        // .find({ price: { $gt: 10, $lte: 20 } })
        // .find({ price: { $in: [10, 15, 20] } })
        // .find()
        // .or([{ author: 'Igor' }, { isPublished: true }])
        // .and([{}, {}])

        // REGULAR EXPRESSIONS
        // Starts with Igor
        // .find({ author: /^Igor/ })

        // Ends with Pereira
        // with 'i' to avoid case sensitivy queries
        // .find({ author: /Pereira$/i })

        // Contais Mosh
        // .find({ author: /.*Igor.*/i })

        .find({ _id: '66fef1171cb721e154ee5785' })
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1, price: 1 })
    console.log(courses[0].price)
}

getCourse()

async function getCoursePageDemo() {
    const pageNumber = 2
    const pageSize = 10

    const courses = await Course
        .find({ author: 'Igor' }, { isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses)
}

async function updateCourse(id) {
    // Approach 1: Query first
    // findById()
    // Modify its properties
    // save()

    // const course = await Course.findById(id)
    // if (!course) return

    // course.isPublished = true
    // course.author = 'Another Author'

    // const result = await course.save()
    // console.log(result)

    // Approach 2: Update first
    // Update directly
    // Optionally :get the updated document

    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'zezin',
            isPublished: false
        }
    }, { new: true })

    console.log(course)
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id })
    console.log(result)
}


/*
CLI simple commands

mongosh

show dbs

use playground
db.courses.find().pretty()
*/