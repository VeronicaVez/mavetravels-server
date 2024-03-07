const mongoose = require("mongoose")
const router = require("express").Router()

const User = require("../models/User.model")
const Travel = require("../models/Travel.model")
const Review = require("../models/Review.model")


router.get('/', (req, res, next) => {

    User
        .find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.status(500).json(err))

})

router.get('/:userId', (req, res, next) => {

    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified user id is not valid' })
        return
    }

    User
        .findById(userId)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))

})

router.get('/:userId/travels', (req, res, next) => {

    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified user id is not valid' })
        return
    }

    User
        .findById(userId)
        .populate("travels")
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.json(user.travels)
        })
        .catch(err => res.status(500).json(err))
})

router.get('/:userId/reviews', (req, res, next) => {

    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified user id is not valid' })
        return
    }

    User
        .findById(userId)
        .populate("reviews")
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.json(user.reviews)
        })
        .catch(err => res.status(500).json(err))
})


router.put('/edit/:userId', (req, res, next) => {

    const { userId } = req.params
    const { username, email, password, role } = req.body


    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified user id is not valid' })
        return
    }

    User
        .findByIdAndUpdate(userId, req.body, { new: true, runValidators: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => next(err))

})

router.delete('/:userId', (req, res, next) => {

    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified user id is not valid' })
        return
    }

    User
        .findByIdAndDelete(userId)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))

})


module.exports = router



