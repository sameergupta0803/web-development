// https://icanhazdadjoke.com/
const button=document.querySelector('button');
const jokes=document.querySelector('#jokes');
const addDadJoke=async()=>{
    const dadJoke=await getDadJoke();
    const joke=document.createElement('li');
    joke.append(dadJoke);
    jokes.append(joke);
}
const getDadJoke=async()=>{
    try{
        const config={headers:{Accept:"application/json"}}
        const res=await axios.get("https://icanhazdadjoke.com/",config);
        return res.data.joke;
    }
    catch(e){
        return e
    } 
}
button.addEventListener('click',addDadJoke)