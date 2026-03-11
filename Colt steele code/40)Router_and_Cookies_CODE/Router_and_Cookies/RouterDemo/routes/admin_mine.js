const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    if (req.query.isAdmin) return next()
    res.send("Not a admin")
})
//middleware for admin routes
router.get('/topsecret', (req, res) => {
    res.send('This is a top secret')
})
router.get('/deleteeverything', (req, res) => {
    res.send('Deleted everything')
})

module.exports = router