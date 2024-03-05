const mongoose = require("mongoose")
const router = require("express").Router()

const Review = require("../models/Review.model")

router.post('/:travelId', (req, res, next) => {

    const { user, title, description, rating, images } = req.body

    Review
        .create(req.body)
        .then(newReview => res.json(newReview))
        .catch(err => res.status(500).json(err))
})

router.get('/', (req, res, next) => {

    Review
        .find()
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
        .then(Review => res.json(Review))
        .catch(err => res.status(500).json(err))
})



router.put('/:reviewId', (req, res, next) => {

    const { reviewId } = req.params
    const { user, title, description, rating, images } = req.body


    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        res.status(400).json({ message: 'Specified review id is not valid' })
        return
    }

    Review
        .findByIdAndUpdate(reviewId, req.body, { new: true, runValidators: true })
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


