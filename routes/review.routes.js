const mongoose = require("mongoose")
const router = require("express").Router()

const Review = require("../models/Review.model")
const User = require("../models/User.model")
const Travel = require("../models/Travel.model")


router.post('/:travelId', (req, res, next) => {

    const { title, description, rating, images } = req.body
    const { travelId, userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(travelId)) {
        res.status(400).json({ message: 'Specified travel id is not valid' });
        return;
    }


    Review
        .create({ user: userId, title, description, rating, images, travel: travelId })
        .then((newReview) => {
            return Travel.findByIdAndUpdate(travelId, { $push: { reviews: newReview._id } })
        })
        .then(res => res.json(res))

        .then((newReview) => {
            return User.findByIdAndUpdate(userId, { $push: { reviews: newReview._id } })
        })
        .then(res => res.json(res))

        .catch(err => res.status(500).json(err))
})


router.get('/', (req, res, next) => {

    Review
        .find()
        .populate("travels", "users")
        .then(allReviews => res.json(allReviews))
        .catch(err => res.status(500).json(err))

})

router.get('/:reviewId', (req, res, next) => {

    const { reviewId } = req.params

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        res.status(400).json({ message: 'Specified review id is not valid' })
        return
    }

    Review
        .findById(reviewId)
        .populate("travels", "users")
        .then(Review => res.json(Review))
        .catch(err => res.status(500).json(err))
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
        .catch(err => res.status(500).json(err))
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
        .catch(err => res.status(500).json(err))
})

module.exports = router


