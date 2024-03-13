const { Schema, model } = require("mongoose")

const reviewSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: {
            type: String
        },
        title: {
            type: String,
            maxlength: 40,
            require: true
        },
        description: {
            type: String,
            maxlength: 450
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            require: true
        },
        source: {
            type: String
        },
        travel: {
            type: Schema.Types.ObjectId,
            ref: "Travel"
        }
    },
    {
        timestamps: true
    }
)

const Review = model("Review", reviewSchema)

module.exports = Review