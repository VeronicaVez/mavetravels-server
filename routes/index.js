module.exports = app => {
    const authRoutes = require("./auth.routes")
    app.use("/api/auth", authRoutes)

    const userRoutes = require("./user.routes")
    app.use("/api/users", userRoutes)

    const travelRoutes = require("./travel.routes")
    app.use("/api/travels", travelRoutes)

    const reviewRoutes = require("./review.routes")
    app.use("/api/reviews", reviewRoutes)

    const uploadRoutes = require("./upload.routes")
    app.use("/api/upload", uploadRoutes)
}