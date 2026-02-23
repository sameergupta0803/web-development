const express = require('express');
const morgan = require('morgan')
const app = express();
const port = 3000;
app.use(morgan('tiny'))//basic info about the request
app.use((req, res, next) => {
    req.currentTime = Date.now();//our own custom property for req,runs before all routes,acts as a middleware
    console.log(req.method, req.path)
    next();
})
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') next();
    res.send('Invalid password')
}
//middleware function for basic authentication
app.get('/', (req, res) => {
    console.log(req.currentTime);//accessing custom req property
    res.send("This is the home page")
})
app.get('/dogs', (req, res) => {
    res.send("Woof Woof")
})
app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS:I sometimes wear headphones in public so that i dont have to talk with them')
})
app.use((req, res) => {
    res.status(404).send("Invalid Page")//used for sending error code 404
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})