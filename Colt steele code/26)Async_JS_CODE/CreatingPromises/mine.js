const fakeRequest=(url)=>{
    return new Promise((resolve,reject)=>{
        const rand=Math.random();
        setTimeout(()=>{
            if(rand>0.7)reject("Connection Timeout :(")
            resolve(`Here is your fake data from ${url}`)
        },1000)
    })
}
fakeRequest('books.com/page1')
    .then((res) => {
        console.log("Success on page 1");
        console.log(res)
        return fakeRequest('books.com/page2')
    })
    .then((res) => {
        console.log("Success on page 2");
        console.log(res)
        return fakeRequest('books.com/page3')
    })
    .then((res) => {
        console.log("Success on page 3");
        console.log(res)
        return fakeRequest('books.com/page4')
    })
    .then((res) => {
        console.log("Success on page 4");
        console.log(res)
    })
    .catch((err) => {
        console.log("Failure");
        console.log(err)
    })
const delayedColorChange=(color,delay)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            document.body.style.backgroundColor=color;
            resolve()
        },delay)
    })
}
//vibgyor
delayedColorChange('red',1000)
    .then(()=> delayedColorChange('orange',1000))
    .then(()=> delayedColorChange('orange',1000))
    .then(()=> delayedColorChange('yellow',1000))
    .then(()=> delayedColorChange('green',1000))
    .then(()=> delayedColorChange('blue',1000))
    .then(()=> delayedColorChange('indigo',1000))
    .then(()=> delayedColorChange('violet',1000))
