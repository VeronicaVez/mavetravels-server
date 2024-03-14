const mongoose = require("mongoose")
const router = require("express").Router()

const Travel = require("../models/Travel.model")
const Review = require("../models/Review.model")

router.post('/:travelId', (req, res, next) => {

    const { title, description, rating, images, userId } = req.body

    Review
        .create({ title, description, rating, images, userId })
        .then(newReview => res.json(newReview))
        .catch(err => next(err))

})

router.post('/', (req, res, next) => {

    const { destination, continent, includesAccomodation, includesTransport, themes, itinerary, dates, price, source } = req.body

    Travel
        .create({ destination, continent, includesAccomodation, includesTransport, themes, itinerary, dates, price, source })
        .then(newTravel => res.json(newTravel))
        .catch(err => next(err))

})

router.get('/All', (req, res, next) => {

    Travel
        .find()
        .then(allTravels => res.json(allTravels))
        .catch(err => next(err))
})


router.get('/continent/:continentName', (req, res, next) => {

    const { continentName } = req.params

    Travel
        .find({ continent: continentName })
        .then(allTravels => res.json(allTravels))
        .catch(err => next(err))
})

router.get('/details/:travelId', (req, res, next) => {

    const { travelId } = req.params

    Review
        .find({ travel: travelId })
        .then(getReviewsByTravelId => res.json(getReviewsByTravelId))
        .catch(err => next(err))

})

router.get('/search', (req, res, next) => {

    const { country_query } = req.query

    const findQuery = country_query ? { destination: { $regex: new RegExp(country_query, 'i') } } : {}

    Travel
        .find(findQuery)
        .then(travels => res.json(travels))
        .catch(err => next(err))
})



router.get('/:travelId', (req, res, next) => {

    const { travelId } = req.params

    if (!mongoose.Types.ObjectId.isValid(travelId)) {
        res.status(400).json({ message: 'Specified travel id is not valid' })
        return
    }

    Travel
        .findById(travelId)
        .then(travel => res.json(travel))
        .catch(err => next(err))

})




router.get('/:travelId/reviews', (req, res, next) => {
    const { travelId } = req.params

    if (!mongoose.Types.ObjectId.isValid(travelId)) {
        res.status(400).json({ message: 'Specified travel id is not valid' })
        return
    }

    Travel
        .findById(travelId)
        .populate("reviews")
        .then(travel => {
            if (!travel) {
                return res.status(404).json({ message: 'Travel not found' })
            }
            res.json(travel.reviews)
        })
        .catch(err => next(err))
})



router.put('/:travelId', (req, res, next) => {

    const { travelId } = req.params
    const { destination, continent, includesAccomodation, includesTransport, themes, itinerary, dates, price, source } = req.body

    if (!mongoose.Types.ObjectId.isValid(travelId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Travel
        .findByIdAndUpdate(
            travelId,
            { destination, continent, includesAccomodation, includesTransport, themes, itinerary, dates, price, source },
            { new: true, runValidators: true }
        )
        .then(updatedTravel => res.json(updatedTravel))
        .catch(err => next(err))

})



router.delete('/:travelId', (req, res, next) => {

    const { travelId } = req.params

    if (!mongoose.Types.ObjectId.isValid(travelId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Travel
        .findByIdAndDelete(travelId)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))

})

module.exports = router