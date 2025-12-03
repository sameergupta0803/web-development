let jokes=require('give-me-a-joke');
let colors=require('colors');
let cowsay=require('cowsay')
jokes.getRandomDadJoke((joke)=>{
    console.log(joke.rainbow);
})