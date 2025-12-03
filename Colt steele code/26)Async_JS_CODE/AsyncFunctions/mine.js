// const login=async (username,password)=>{
//     if(!username || !password)throw "Missing credentials";
//     if(password=="abcd1234")return "Welcome to the website";
//     throw "Invalid password";
// }
//throw means promise got rejected and normal return means promise is resolved.async functions return promises by default
// login('Sameer','abcd1234')
//     .then((res)=>{
//         console.log(res)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

// delayedColorChange('red', 1000)
//     .then(() => delayedColorChange('orange', 1000))
//     .then(() => delayedColorChange('yellow', 1000))
//     .then(() => delayedColorChange('green', 1000))
//     .then(() => delayedColorChange('blue', 1000))
//     .then(() => delayedColorChange('indigo', 1000))
//     .then(() => delayedColorChange('violet', 1000))

//await keyword

const rainbow=async()=>{
    await delayedColorChange('red',1000);
    await delayedColorChange('orange',1000);
    await delayedColorChange('yellow',1000);
    await delayedColorChange('green',1000);
    await delayedColorChange('blue',1000);
    await delayedColorChange('indigo',1000);
    await delayedColorChange('violet',1000);
    return 'All done!'
}
//await stops the rest of the code and executes it only after it is resolved.We can only await promises and async functions

// rainbow().then((msg)=>console.log(msg))
const printRainbow=async()=>{
    let data=await rainbow();
    console.log(data); //prints 'All done!' after completion of rainbow()
}
printRainbow();

//catching errors with async await
const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 2000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
    })
}
async function makeTwoRequests(){
    try{
        let data1=await fakeRequest('/page1');
        console.log(data1);//'Here is your fake data from /page1'
        let data2=await fakeRequest('/page2');
        console.log(data2);//'Here is your fake data from /page2'
    }
    catch(e){
        //when our promise gets rejected,we execute the catch block.The e consists of the message we passed in reject
        console.log("Something went wrong!");
        console.log(e);//'Connection Timeout :('
    }
}
//This is how we use async in real world and mostly we dont have to write promises on our own,its given.