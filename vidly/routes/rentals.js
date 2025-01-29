const auth = require('../middleware/auth')
const { Rental, validate } = require('../models/rental')
const { Movie } = require('../models/movie')
const { Customer } = require('../models/customer')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/', auth, async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut')
    res.send(rentals)
})

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(400).send('Invalid customer.')

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(400).send('Invalid movie.')

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.')

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })

    // const session = await mongoose.startSession();
    // session.startTransaction();

    // try {
    //     await rental.save({ session });

    //     await Movie.updateOne(
    //         { _id: movie._id },
    //         { $inc: { numberInStock: -1 } },
    //         { session }
    //     );

    //     await session.commitTransaction();
    //     session.endSession();

    //     res.send(rental);
    // }
    // catch (error) {
    //     await session.abortTransaction();
    //     session.endSession();

    //     res.status(500).send('Something went wrong while processing the rental.');
    // }

    rental = await rental.save()

    movie.numberInStock--
    movie.save()

    res.send(rental)

})

module.exports = router


/* 
abrir dois terminais como adm

rodar isso no primeiro
mongod --replSet rs0 --dbpath "C:\Program Files\MongoDB\Server\8.0\data\db" --logpath "C:\Program Files\MongoDB\Server\8.0\data\log\mongod.log" --logappend --bind_ip localhost --port 27017

mongosh no segundo
e
rs.initiate()

use vidly

*opção sem transaction(evitar)

    // rental = await rental.save()

    // movie.numberInStock--
    // movie.save()

    // res.send(rental)


Para voltar ao normal

abrir dois terminais como adm

rodar isso no primeiro
mongod --dbpath "C:\Program Files\MongoDB\Server\8.0\data\db" --logpath "C:\Program Files\MongoDB\Server\8.0\data\log\mongod.log" --logappend --bind_ip localhost --port 27017

mongosh

use vidly
*/
