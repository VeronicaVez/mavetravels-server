require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require("./config")(app)

// ------ ROUTES ------

const authRoutes = require("./routes/auth.routes")
app.use("/api/auth", authRoutes)

const travelRoutes = require("./routes/travel.routes")
app.use("/api/travels", travelRoutes)

const reviewRoutes = require("./routes/review.routes")
app.use("/api/reviews", reviewRoutes)

require("./error-handling")(app)

module.exports = app
