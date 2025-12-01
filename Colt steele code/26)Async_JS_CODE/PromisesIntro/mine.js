// THE CALLBACK VERSION
const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            failure('Connection Timeout :(')
        } else {
            success(`Here is your fake data from ${url}`)
        }
    }, delay)
}
// THE PROMISE VERSION 
const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
    })
}
// fakeRequestCallback('books.com/page1',(res)=>{
//     console.log("success for page 1!");
//     console.log(res)
//     fakeRequestCallback('books.com/page2',(res)=>{
//         console.log("success for page 2!");
//         console.log(res)
//         fakeRequestCallback('books.com/page3',(res)=>{
//             console.log("success for page 3!");
//             console.log(res)
//             fakeRequestCallback('books.com/page4',(res)=>{
//                 console.log("success for page 4!");
//                 console.log(res)
//             },(err)=>{
//                 console.log("Failure on page 4!");
//                 console.log(err);
//             })
//         },(err)=>{
//             console.log("Failure on page 3!");
//             console.log(err);
//         })
//     },(err)=>{
//         console.log("Failure on page 2!");
//         console.log(err);
//     })
// },(err)=>{
//     console.log("Failure on page 1!");
//     console.log(err);
// })
fakeRequestPromise('books.com/page1').then((res)=>{
    console.log("Success on page 1");
    console.log(res)
}).catch((err)=>{
    console.log("Failure on page 1");
    console.log(err)
})