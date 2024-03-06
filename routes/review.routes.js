const mongoose = require("mongoose")
const router = require("express").Router()

const Review = require("../models/Review.model")
const User = require("../models/User.model")
const Travel = require("../models/Travel.model")


router.post('/:travelId', (req, res, next) => {

    const { travelId } = req.params
    const { title, description, rating, images, userId } = req.body

    if (!mongoose.Types.ObjectId.isValid(travelId)) {
        res.status(400).json({ message: 'Specified travel id is not valid' })
        return
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified user id is not valid' })
        return
    }


    Review
        .create({ user: userId, title, description, rating, images, travel: travelId })
        .then((newReview) => {
            return Travel.findByIdAndUpdate(travelId, { $push: { reviews: newReview._id } })
        })
        .then((updatedTravel) => {
            return User.findByIdAndUpdate(userId, { $push: { reviews: updatedTravel._id } })
        })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => next(err))

})


router.get('/', (req, res, next) => {

    Review
        .find()
        .populate("travel", "user")
        .then(allReviews => res.json(allReviews))
        .catch(err => next(err))


})

router.get('/:reviewId', (req, res, next) => {

    console.log('WAT')

    const { reviewId } = req.params

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        res.status(400).json({ message: 'Specified review id is not valid' })
        return
    }

    Review
        .findById(reviewId)
        .populate("travel", "user")
        .then(Review => res.json(Review))
        .catch(err => next(err))
})


router.put('/:reviewId', (req, res, next) => {

    const { reviewId } = req.params
    const { title, description, rating, images } = req.body

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        res.status(400).json({ message: 'Specified review id is not valid' })
        return
    }

    Review
        .findByIdAndUpdate(
            reviewId,
            { user, title, description, rating, images },
            { new: true, runValidators: true }
        )
        .then(updatedReview => res.json(updatedReview))
        .catch(err => next(err))

})

router.delete('/:reviewId', (req, res, next) => {

    const { reviewId } = req.params

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        res.status(400).json({ message: 'Specified review id is not valid' })
        return
    }

    Review
        .findByIdAndDelete(reviewId)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))

})

module.exports = router


