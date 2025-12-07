const express = require('express')
const app = express()
const port = 3000
// app.use((req,res)=>{
//     console.log("A request was made!!");
//     // res.send("<h1>This is a response</h1>")
//     res.send({name:"sameer"});
// })
//Handles all the requests made to the server
app.get('/',(req,res)=>{
    res.send("You are on homepage!")
})
//.get() handles the get() requests made to the server.'/' indicates the homepage.We can givrate response to seperate pages using get()
app.get('/cats',(req,res)=>{
    res.send("You are on cats page!")
})
app.get('/dogs',(req,res)=>{
    res.send("You are on dogs page!")
})
app.post('/dogs',(req,res)=>{
    res.send("This is a post request to /dogs page!")
})
//.post() handles the post requests make to the server.
app.get('/r/:subreddit',(req,res)=>{
    const {subreddit}=req.params;//consists of key:value pair of parameter passed
    res.send(`<h1>You are viewing the subreddit ${subreddit}</h1>`);
})
app.get("/r/:subreddit/:postId",(req,res)=>{
    const {subreddit,postId}=req.params;
    res.send(`<h1>You are viewing post with ID ${postId} on subreddit ${subreddit}</h1>`)
})
app.get("/search",(req,res)=>{
    const query=req.query;//stores key:value pairs of query passed.{name:'Sameer',gender:'M'} on /search?name=Sameer&gender=M
    const keyValues=Object.entries(query);//gets key:value arrays from object
    if(!keyValues.length){
        res.send("<h1>No query found</h1>")
    }
    else{
        
        let responseString=``;
        for(let [key,value] of keyValues){
            responseString+=`<h1>${key}:${value}</h1>`
        }
        res.send(responseString)//sending the response string,only gets send once
    }
})
app.get('*',(req,res)=>{
    res.send("Oops!I don't know that page!!")
})
//'*' is used for request that dont match any other responses.Make sure to put it in the end as if we put it in the start then all the pages will give the same response.
app.listen(port,()=>{
    console.log(`Listening on port:${port}`)
})
//connects to the server with the specified port