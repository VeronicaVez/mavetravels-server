const { Schema, model } = require("mongoose")

const travelSchema = new Schema(
    {
        destination: {
            type: String,
            required: [true, 'Destination is required.']
        },
        includesAccomodation: {
            type: Boolean,
            default: true
        },
        includesTransport: {
            type: Boolean
        },
        themes: [{
            type: String,
            enum: ["Beach life", "Mountain life", "Party", "Sports", "Wild life", "Food", "Pet Friendly"]
        }],
        itinerary: [{
            day: {
                type: Number
            },
            activities: [{
                type: String
            }]
        }],
        dates: {
            start: Date,
            end: Date
        },
        price: {
            type: Number,
            required: [true, 'Price is required.'],
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }],
        source: {
            type: String
        },
        interestedPeople: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true
    }
)

const Travel = model("Travel", travelSchema)

module.exports = Travel