const express = require('express')
const cookieParser = require('cookie-parser')//we use cookie-parser to retrieve the data from cookies
const app = express()
app.use(cookieParser('thisismysecret'))//'thisismysecret' is used to sign the cookie
app.get('/greet', (req, res) => {
    const { name } = req.cookies;
    //req.cookies have cookies stored in key value pair inside an object
    res.send(`hello ${name}`)
})
app.get('/setname', (req, res) => {
    res.cookie('name', 'sameer')
    res.cookie('animal', 'chicken')
    //storing key value pair of cookies
    res.send('Ok sent you a cookie')
})
app.get('/signedcookie', (req, res) => {
    res.cookie('fruit', 'mango', { signed: true })
    //signed cookies are used to check whether they are tampered with
    res.send('Signed the cookie')
})
app.get('/verifyfruit', (req, res) => {
    // console.log(req.cookies)
    res.send(req.signedCookies);
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})