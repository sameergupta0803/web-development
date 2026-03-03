const express = require('express');
const session = require('express-session')//package for using session in express
const app = express()
const sessionOptions = { secret: "this is a secret", resave: false, saveUninitialized: false }
//secret is used to check if session is tampered with.resave and saveUninitialized are there just to remove deprecated error
app.use(session(sessionOptions))

app.get('/viewcount', (req, res) => {
    if (req.session.count) req.session.count += 1
    else req.session.count = 1
    // console.log(req.session)
    res.send(`Viewed this page ${req.session.count} times`)
})
app.get('/register', (req, res) => {
    const { username = "Anonymous" } = req.query;
    req.session.username = username;
    res.redirect('/greet')
})
app.get('/greet', (req, res) => {
    const { username } = req.session
    res.send(`hello ${username}`)
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})