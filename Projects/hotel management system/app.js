//SETUP & CONFIGURATION
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hotel_app', {
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.log('DB Connection Error:', err));
// App Config
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// Setup the Hotel Schema
const hotelSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number
});
// Create the Model
const Hotel = mongoose.model('Hotel', hotelSchema);
// ROOT ROUTE
app.get('/', (req, res) => {
    res.render('landing');//redirects to hotels
});
// INDEX ROUTE - Show all hotels
app.get('/hotels', async (req, res) => {
    try {
        // Get all hotels from DB
        const allHotels = await Hotel.find({});
        res.render('index', { hotels: allHotels });
    } catch (err) {
        console.log(err);
    }
});

// NEW ROUTE - Show form to create new hotel
app.get('/hotels/new', (req, res) => {
    res.render('new');
});

// CREATE ROUTE - Add new hotel to DB
app.post('/hotels', async (req, res) => {
    // Get data from form and add to hotels array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const price = req.body.price;
    const newHotel = { name: name, image: image, description: desc, price: price };
    try {
        // Create a new hotel and save to DB
        await Hotel.create(newHotel);
        // Redirect back to hotels page
        res.redirect('/hotels');
    } catch (err) {
        console.log(err);
    }
});
// ABOUT ROUTE
app.get('/about', (req, res) => {
    res.render('about');
});
// SEED ROUTE (Run this once to populate DB)
app.get('/seed', async (req, res) => {
    try {
        // 1. Delete all existing hotels first (optional, keeps it clean)
        await Hotel.deleteMany({});

        // 2. Define the default hotels
        const seeds = [
            {
                name: "Ocean View Resort",
                image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
                description: "A beautiful resort right on the beach with amazing sunset views.",
                price: 250
            },
            {
                name: "Mountain High Cabin",
                image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
                description: "Escape to the mountains in this cozy wooden cabin.",
                price: 120
            },
            {
                name: "Urban Luxury Hotel",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
                description: "Experience the city life in style with our 5-star amenities.",
                price: 400
            }
        ];

        // 3. Insert them into the DB
        await Hotel.insertMany(seeds);
        res.send("Database seeded! <a href='/hotels'>Click here to view hotels</a>");

    } catch (err) {
        res.send("Error seeding database: " + err.message);
    }
});
app.listen(3000, () => {
    console.log('The Hotel Server has started on port 3000!');
});