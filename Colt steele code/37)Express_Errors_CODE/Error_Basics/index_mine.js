const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppErrorMine')

app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!")
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    throw new AppError("Incorrect password", 401)//Creates a status property for the error as well
    //throw new Error("Incorrect password")//Throws error with the message "Incorrect password",is passed to our error handler
    // res.send("YOU NEED A PASSWORD!")
}

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!')
})
app.get('/error', (req, res) => {
    dog.fly();
})
app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})
app.get('/admin', (req, res) => {
    throw new AppError("You are not an admin", 403);
})
app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

app.use((err, req, res, next) => {
    const { status = 500, message = "You have an Error!!" } = err;
    //we need default values as err doesnt have status property unless we throw it using the AppError instance
    console.log(err.message)
    res.status(status).send(message);
    //Shows the error on the dev tools and displays the default/custom error message on the webpage
    // next(err);
})
// app.use((err, req, res, next) => {
//     console.log("ERROR!")
//     console.log(err);
//     next(err);//used to call the default express error handler
// })
//Used to handle all the incoming errors
app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})