const express = require('express');
const path = require('path')
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');
const app = express();
const port = 3000;

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'))
// Views folder and EJS setup:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
// Our fake database:
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]
app.get('/', (req, res) => {
    res.send("Hello!");
})
app.get('/comments', (req, res) => {
    res.render('comments/index_mine', { comments })
})
app.get('/comments/new', (req, res) => {
    res.render('comments/new_mine')
})
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => c.id === id);
    res.render('comments/show_mine', { comment })
})
app.patch('/comments/:id', (req, res) => {
    const { comment: newComment } = req.body;
    const { id } = req.params;
    const foundComment = comments.find((c) => c.id === id);
    foundComment.comment = newComment;
    res.redirect('/comments')
})
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter((c) => c.id !== id);
    console.log(comments);
    res.redirect("/comments")
})
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => c.id === id);
    res.render('comments/edit_mine', { comment })
})
app.listen(port, () => {
    console.log(`Listening to ${port}`)
})