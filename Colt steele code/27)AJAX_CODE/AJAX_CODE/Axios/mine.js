// axios.get("https://swapi.dev/api/people/1/")
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log("Error!",err);
// })
const getStarWarsPerson=async (id=1)=>{
    try{
        const data=await axios.get(`https://swapi.dev/api/people/${id}/`)
        console.log(data)
    }
    catch(e){
        console.log("Error!",e)
    }
}
getStarWarsPerson(2)
