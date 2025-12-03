const form=document.querySelector('#searchForm')
const movieInput=document.querySelector('#movie')
let movieImages=document.querySelector('#movieImages')
form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    movieImages.innerHTML='';
    const movieName=movieInput.value;
    const config={params:{q:movieName}}
    const movies=await axios.get(`https://api.tvmaze.com/search/shows`,config);
    displayMovieImages(movies.data);
    
})
const displayMovieImages=(movies)=>{
    // console.log(movies.data[9].show.image.medium)
    for(let movie of movies){
        if(movie.show.image){
            const imageSrc=movie.show.image.medium;
            const movieImage=document.createElement('img');
            movieImage.src=imageSrc;
            movieImages.append(movieImage)
        }  
    }
}
