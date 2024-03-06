const { Schema, model } = require("mongoose")

const travelSchema = new Schema(
    {
        destination: {
            type: String,
            required: [true, 'Destination is required.']
        },
        continent: [{
            type: String,
            enum: ["Europe", "Asia", "Africa", "North America", "South America", "Australia & Oceania"],
            required: [true, 'Continent is required.']

        }],
        includesAccomodation: {
            type: Boolean,
            default: true
        },
        includesTransport: {
            type: Boolean
        },
        themes: [{
            type: String,
            enum: ["Beach life", "Trekking", "Party", "Sports", "Wild life", "Food", "Pet Friendly"]
        }],
        itinerary: [{
            day: {
                type: Number
            },
            title: {
                type: String
            },
            activities: [{
                type: String
            }],
            dayDescription: {
                type: String
            }
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