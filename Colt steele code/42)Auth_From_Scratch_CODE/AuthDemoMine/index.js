const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('./models/user')
const session = require('express-session')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/AuthDemo')
    .then(() => {
        console.log('Connected')
    })
    .catch((err) => {
        console.log(err)
    })
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: "thisisnotagoodsecret", resave: false, saveUninitialized: true }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) return res.redirect('/login')
    next();
}
app.get('/', (req, res) => {
    res.send("This is the home page")
})
app.get('/secret', requireLogin, (req, res) => {
    res.render('secret')
})
app.get('/topsecret', requireLogin, (req, res) => {
    res.send('This is a top secret')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/logout', (req, res) => {
    // req.session.user_id = null;
    req.session.destroy()//used to completely destroy the session
    res.redirect('/login')
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findAndValidate(username, password)
    if (user) {
        req.session.user_id = user._id
        return res.redirect('/secret')
    }
    else res.redirect('/login')
})
app.post('/register', async (req, res) => {
    const { password, username } = req.body
    const user = new User({ username, password })
    await user.save();
    req.session.user_id = user._id
    res.redirect('/secret')
})
app.listen(3000, (req, res) => {
    console.log('SERVING ON PORT 3000')
})