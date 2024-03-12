const mongoose = require("mongoose")
const router = require("express").Router()

const User = require("../models/User.model")
const Travel = require("../models/Travel.model")
const Review = require("../models/Review.model")

router.get('/', (req, res, next) => {

    User
        .find()
        .then(allUsers => res.json(allUsers))
        .catch(err => next(err))
})

router.get('/:username', (req, res, next) => {

    const { username } = req.params

    User
        .findOne({ username })
        .then(user => res.json(user))
        .catch(err => next(err))
})

router.get('/:username/travels', (req, res, next) => {

    const { username } = req.params


    User
        .findOne({ username })
        .populate("travels")
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.json(user.travels)
        })
        .catch(err => next(err))
})

router.get('/:username/reviews', (req, res, next) => {

    const { username } = req.params


    User
        .findOne({ username })
        .populate("reviews")
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.json(user.reviews)
        })
        .catch(err => next(err))
})

router.delete('/:username', (req, res, next) => {

    const { username } = req.params

    User
        .findOneAndDelete({ username })
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
})


module.exports = router