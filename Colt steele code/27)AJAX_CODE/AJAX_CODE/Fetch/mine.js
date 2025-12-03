// fetch("https://swapi.dev/api/people/1/")
// .then((res)=>{
//     console.log("Resolved req 1!");
//     return res.json();
// })
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log("Error!")
//     console.log(err)
// })
// fetch("https://swapi.dev/api/people/1/")
// .then((res)=>{
//     console.log("Resolved req 1!");
//     return res.json();
// })
// .then((data)=>{
//     console.log(data);
//     return fetch("https://swapi.dev/api/people/2/")
// })
// .then((res)=>{
//     console.log("Resolved req 2!")
//     return res.json();
// })
// .then((data)=>{
//     console.log(data)
// })
// .catch((err)=>{
//     console.log("Error!")
//     console.log(err)
// })
const loadStarWarsPeople=async ()=>{
    try{
        const res=await fetch(`https://swapi.dev/api/people/1/`)
        const data=await res.json();
        console.log(data);
        const res2=await fetch(`https://swapi.dev/api/people/2/`)
        const data2=await res2.json();
        console.log(data2);
    }
    catch(e){
        console.log("Error!")
        console.log(e)
    }
}
loadStarWarsPeople()