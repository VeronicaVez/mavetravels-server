require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require("./config")(app)

const { isAuthenticated } = require("./middleware/jwt.middleware")

// ------ ROUTES ------

const authRoutes = require("./routes/auth.routes")
app.use("/api/auth", authRoutes)

const userRoutes = require("./routes/user.routes")
app.use("/api/users", userRoutes)

const travelRoutes = require("./routes/travel.routes")
app.use("/api/travels", travelRoutes)

const reviewRoutes = require("./routes/review.routes")
app.use("/api/reviews", reviewRoutes)

const uploadRoutes = require("./routes/upload.routes")
app.use("/api/upload", uploadRoutes)



require("./error-handling")(app)

module.exports = app
