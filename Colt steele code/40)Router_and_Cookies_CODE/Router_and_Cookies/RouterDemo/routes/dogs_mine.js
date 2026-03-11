const express = require('express')
const router = express.Router()
//we need router for setting seperate routes in our app,works same as app
router.get('/', (req, res) => {
    res.send('All dogs')
})
router.get('/:id', (req, res) => {
    res.send('Viewing one dog')
})
router.get('/:id/edit', (req, res) => {
    res.send('Editing one dog')
})

module.exports = router