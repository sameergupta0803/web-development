const express = require('express');
const path = require('path');
const data=require('./data.json')
const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')))//allows us to use style sheets in ejs files from the public directory.Also joined the path so that public is linked even if we execute node from another directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))//if we execute this file from another directory,then node will look for /views in that directory,so this command helps us to check for /views folder in the directory of the file being executed using path module
app.get('/', (req, res) => {
    res.render("home.ejs")
})
app.get('/cats',(req,res)=>{
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats_mine',{cats})
})
app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1
    res.render("random_mine", { randNum: num })//the object is passed to the ejs file and we can use its keys to render info dynamically.we can also use {num} for {num:num} short form with num as the key and value.
})
app.get('/r/:subreddit',(req,res)=>{
    const {subreddit}=req.params;
    const subInfo=data[subreddit];
    if(subInfo)res.render('subreddit_mine',{...subInfo});
    else res.render('notfoundsubreddit',{subreddit});
    
})
app.get('/:page',(req,res)=>{
    const {page}=req.params;
    // console.log(page)
    res.render('notfoundall',{page})
})
app.listen(port, () => {
    console.log(`Listening to ${port}`)
})