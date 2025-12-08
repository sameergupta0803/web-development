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
// CONTACT ROUTE
app.get('/contact', (req, res) => {
    res.render('contact');
});
// SEED ROUTE (Run this once to populate DB)
app.get('/seed', async (req, res) => {
    try {
        await Hotel.deleteMany({});

        const seeds = [
            { name: "Ocean View Resort", price: 250, description: "Stunning sunset views.", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80" },
            { name: "Mountain Cabin", price: 120, description: "Cozy wood cabin.", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80" },
            { name: "Urban Luxury", price: 400, description: "City center style.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" },
            { name: "Desert Oasis", price: 180, description: "A mirage come true.", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80" },
            { name: "Lakeside Lodge", price: 200, description: "Serene waterside living.", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80" },
            { name: "Forest Retreat", price: 150, description: "Hidden in the pines.", image: "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=800&q=80" },
            { name: "Snowy Peaks Hotel", price: 300, description: "Ski-in, ski-out access.", image: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=800&q=80" },
            { name: "Tropical Paradise", price: 350, description: "Island vibes only.", image: "https://images.unsplash.com/photo-1571896349842-6e53ce41e869?w=800&q=80" },
            { name: "Historic Manor", price: 220, description: "Old world charm.", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80" },
            { name: "Modern Loft Stay", price: 190, description: "Minimalist design.", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80" },
            { name: "Countryside Inn", price: 110, description: "Quiet and peaceful.", image: "https://images.unsplash.com/photo-1562790351-d273a961e05b?w=800&q=80" },
            { name: "Cliffside Villa", price: 500, description: "Living on the edge.", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80" }
        ];

        await Hotel.insertMany(seeds);
        res.send(`
            <div style="text-align:center; padding-top: 50px; font-family: sans-serif;">
                <h1>✅ Database Seeded!</h1>
                <p>Added 12 fresh hotels.</p>
                <a href="/hotels" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Website</a>
            </div>
        `);
    } catch (err) {
        res.send("Error: " + err);
    }
});
app.listen(3000, () => {
    console.log('The Hotel Server has started on port 3000!');
});