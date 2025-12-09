const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/movieApp', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log("Error:" + err)
    })
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});
const Movie = mongoose.model('Movie', movieSchema);
// const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R' });
//amadeus.save();//saved to database.Returns a promise
Movie.insertMany([
    { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
    { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
    { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
    { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
    { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
])
    .then(data => {
        console.log("IT WORKED!")
        // console.log(data);
    })
// Movie.find({year:{$gte:2000}}).then(data=>console.log(data))//data stores the result from find,returned in array
// Movie.findOne({year:{$gte:2000}}).then(data=>console.log(data))//returns only the first element that satisfies the condition
// Movie.findById('6936fa58ba23bdd00d314579').then(data=>console.log(data))//allows to search by id,very commonly used with express
// Movie.updateOne({title:'Amadeus'},{year:1984}).then(res=>console.log(res))//Updates only one element.Changes the year to 1984 for Amadeus. res stores the details about the updates values and not the element itself .
// Movie.updateMany({title:{$in:['Amadeus','Stand By Me']}},{score:10}).then(res=>console.log(res))//updates multiple values
// Movie.findOneAndUpdate({title:'The Iron Giant'},{score:7.0}).then(res=>console.log(res))//updates the value and also returns the old values of the updated element.
// Movie.findOneAndUpdate({title:'The Iron Giant'},{score:7.8},{new:true}).then(res=>console.log(res))//returns the new updated element in res with the help of {new:true}
// Movie.deleteOne({title:'Amelie'}).then(msg=>console.log(msg))//Deletes the first record. msg contained count of elements deleted
// Movie.deleteMany({year:{$gte:1999}}).then(msg=>console.log(msg))Deletes all the record with year>=1999
// Movie.findOneAndDelete({title:'Moonrise Kingdom'}).then(res=>console.log(res))//Deletes and also msg stores the element being deleted