const router = require("express").Router()

const uploaderMiddleware = require("../middleware/uploader.middleware")


router.post('/image', uploaderMiddleware.single('imageData'), (req, res) => {

    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error loading file' })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})


module.exports = router

module.exports = router