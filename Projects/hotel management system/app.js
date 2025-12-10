const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

mongoose.connect('mongodb://127.0.0.1:27017/hotel_app')
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log("Error:" + err)
    })
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); // Serve images
app.use(methodOverride('_method')); // Allow PUT/DELETE

// Session Config (Tracks login state)
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));

// Global Variable Middleware (Makes 'currentUser' available in all views)
app.use(async (req, res, next) => {
    res.locals.currentUser = req.session.userId ? await User.findById(req.session.userId) : null;
    next();
});

// Image Upload Config (Multer)
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 2. DATABASE MODELS

// User Model
const userSchema = new mongoose.Schema({
    username: String,
    password: String, // Stored as plain text (For learning only!)
    isAdmin: { type: Boolean, default: false }
});
const User = mongoose.model('User', userSchema);

// Review Model
const reviewSchema = new mongoose.Schema({
    text: String,
    rating: Number,
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: String
    }
});
const Review = mongoose.model('Review', reviewSchema);

// Hotel Model
const hotelSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    averageRating: { type: Number, default: 0 },
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: String
    },
    reviews: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }
    ]
});
const Hotel = mongoose.model('Hotel', hotelSchema);

// 3. MIDDLEWARE (Permissions)

const isLoggedIn = (req, res, next) => {
    if (req.session.userId) return next();
    res.redirect('/login');
};

const checkHotelOwnership = async (req, res, next) => {
    if (req.session.userId) {
        const foundHotel = await Hotel.findById(req.params.id);
        const currentUser = await User.findById(req.session.userId);
        // Allow if user is author OR user is Admin
        if (foundHotel.author.id.equals(req.session.userId) || currentUser.isAdmin) {
            next();
        } else {
            res.redirect('back');
        }
    } else {
        res.redirect('back');
    }
};

// 4. ROUTES

app.get('/', (req, res) => res.redirect('/hotels'));

// AUTH ROUTES
app.get('/register', (req, res) => res.render('register'));

app.post('/register', async (req, res) => {
    const { username, password, adminCode } = req.body;
    // Simple Admin Logic: If they type "secret123" in admin code, they are admin
    const isAdmin = adminCode === 'secret123';
    const user = await User.create({ username, password, isAdmin });
    req.session.userId = user._id; // Auto login
    res.redirect('/hotels');
});

app.get('/login', (req, res) => res.render('login'));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && user.password === password) {
        req.session.userId = user._id;
        res.redirect('/hotels');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/hotels');
});

// HOTEL ROUTES
app.get('/hotels', async (req, res) => {
    // 1. Get query parameters
    const { minRating, maxPrice } = req.query;

    // 2. Build Query Object
    let query = {};

    if (minRating) {
        query.averageRating = { $gte: Number(minRating) }; // Greater than or equal
    }

    if (maxPrice) {
        query.price = { $lte: Number(maxPrice) }; // Less than or equal
    }

    // 3. Find with query
    const allHotels = await Hotel.find(query);

    // Pass the current query values back to the view so the inputs stay filled
    res.render('index', { hotels: allHotels, search: req.query });
});
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/seed', async (req, res) => {
    try {
        // 1. CLEAR EXISTING DATA
        await Hotel.deleteMany({});
        // await User.deleteMany({});
        await Review.deleteMany({});

        // 2. CREATE DUMMY USERS
        const u1 = await User.create({ username: "Alice", password: "password", isAdmin: false });
        const u2 = await User.create({ username: "Bob", password: "password", isAdmin: false });
        const u3 = await User.create({ username: "Charlie", password: "password", isAdmin: false });
        const allUsers = [u1, u2, u3];

        // 3. HOTEL DATA (15 Hotels)
        const seeds = [
            { name: "Ocean View Resort", price: 250, description: "Stunning sunset views.", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80" },
            { name: "Mountain Cabin", price: 120, description: "Cozy wood cabin.", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80" },
            { name: "Urban Luxury", price: 400, description: "City center style.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" },
            { name: "Desert Oasis", price: 180, description: "A mirage come true.", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80" },
            { name: "Lakeside Lodge", price: 200, description: "Serene waterside living.", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80" },
            { name: "Forest Retreat", price: 150, description: "Hidden in the pines.", image: "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=800&q=80" },
            { name: "Snowy Peaks", price: 300, description: "Ski-in, ski-out access.", image: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=800&q=80" },
            { name: "Tropical Paradise", price: 350, description: "Island vibes only.", image: "https://images.unsplash.com/photo-1571896349842-6e53ce41e869?w=800&q=80" },
            { name: "Historic Manor", price: 220, description: "Old world charm.", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80" },
            { name: "Modern Loft", price: 190, description: "Minimalist design.", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80" },
            { name: "Countryside Inn", price: 110, description: "Quiet and peaceful.", image: "https://images.unsplash.com/photo-1562790351-d273a961e05b?w=800&q=80" },
            { name: "Cliffside Villa", price: 500, description: "Living on the edge.", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80" },
            { name: "Glamping Spot", price: 90, description: "Luxury camping.", image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80" },
            { name: "Sky High Hotel", price: 600, description: "View from the top.", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80" },
            { name: "River Bungalow", price: 140, description: "Sleep by the river.", image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80" }
        ];

        // 4. LOOP AND CREATE
        // We use a regular loop so we can track the index 'i'
        for (let i = 0; i < seeds.length; i++) {
            const hotelData = seeds[i];
            const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

            // Create the basic Hotel
            const newHotel = new Hotel({
                name: hotelData.name,
                image: hotelData.image,
                description: hotelData.description,
                price: hotelData.price, // Uses the seed price
                author: {
                    id: randomUser._id,
                    username: randomUser.username
                },
                averageRating: 0 // Default
            });

            // LOGIC: Give reviews to the first 7 hotels (Index 0 to 6)
            // The rest (Index 7 to 14) will have 0 reviews.
            if (i < 7) {
                // Generate 4 or 5 reviews
                const numberOfReviews = Math.floor(Math.random() * 2) + 4; // Returns 4 or 5
                let totalRating = 0;

                for (let j = 0; j < numberOfReviews; j++) {
                    const reviewUser = allUsers[Math.floor(Math.random() * allUsers.length)];
                    const rating = Math.floor(Math.random() * 5) + 1; // 1 to 5 stars

                    const review = await Review.create({
                        text: "This is a dummy review generated by seed. The location was " + (rating > 3 ? "great!" : "okay."),
                        rating: rating,
                        author: { id: reviewUser._id, username: reviewUser.username }
                    });

                    newHotel.reviews.push(review);
                    totalRating += rating;
                }

                // Calculate Average for this hotel
                newHotel.averageRating = totalRating / numberOfReviews;
            }

            await newHotel.save();
        }

        res.send(`
            <div style="text-align:center; padding-top: 50px; font-family: sans-serif;">
                <h1>✅ Database Reset & Seeded!</h1>
                <p>Created 15 Hotels.</p>
                <p><strong>Hotels 1-7:</strong> Have 4-5 reviews each.</p>
                <p><strong>Hotels 8-15:</strong> Have 0 reviews.</p>
                <br>
                <a href="/hotels" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Website</a>
            </div>
        `);

    } catch (err) {
        console.log(err);
        res.send("Error seeding DB: " + err.message);
    }
});
app.post('/hotels', isLoggedIn, upload.single('image'), async (req, res) => {
    // Construct new hotel object
    const newHotel = {
        name: req.body.name,
        image: '/uploads/' + req.file.filename, // Save path to file
        description: req.body.description,
        price: req.body.price,
        author: {
            id: req.session.userId,
            username: (await User.findById(req.session.userId)).username
        }
    };
    await Hotel.create(newHotel);
    res.redirect('/hotels');
});

app.get('/hotels/new', isLoggedIn, (req, res) => res.render('new'));

// SHOW ROUTE (Updated to populate reviews)
app.get('/hotels/:id', async (req, res) => {
    const hotel = await Hotel.findById(req.params.id).populate('reviews');
    res.render('show', { hotel: hotel });
});
// MY HOTELS ROUTE
app.get('/my-hotels', isLoggedIn, async (req, res) => {
    // Find hotels where the author.id matches the currently logged-in user
    const userHotels = await Hotel.find({ 'author.id': req.session.userId });
    res.render('my-hotels', { hotels: userHotels });
});
// 1. CREATE REVIEW
app.post('/hotels/:id/reviews', isLoggedIn, async (req, res) => {
    const hotel = await Hotel.findById(req.params.id).populate('reviews');
    const user = await User.findById(req.session.userId);

    // Checks
    if (hotel.author.id.equals(user._id)) return res.send("Cannot review own hotel");
    const existing = hotel.reviews.find(r => r.author.id.equals(user._id));
    if (existing) return res.send("Already reviewed");

    // Create Review
    const review = await Review.create({
        text: req.body.text,
        rating: Number(req.body.rating),
        author: { id: user._id, username: user.username }
    });

    // Add to hotel
    hotel.reviews.push(review);
    await hotel.save();

    // --- RECALCULATE AVERAGE ---
    const updatedHotel = await Hotel.findById(req.params.id).populate('reviews');
    if (updatedHotel.reviews.length > 0) {
        const sum = updatedHotel.reviews.reduce((acc, next) => acc + next.rating, 0);
        updatedHotel.averageRating = sum / updatedHotel.reviews.length;
    } else {
        updatedHotel.averageRating = 0;
    }
    await updatedHotel.save();
    // ---------------------------

    res.redirect('/hotels/' + hotel._id);
});
// EDIT REVIEW FORM
app.get('/hotels/:id/reviews/:reviewId/edit', isLoggedIn, async (req, res) => {
    const review = await Review.findById(req.params.reviewId);
    // Check if current user owns the review
    if (review.author.id.equals(req.session.userId)) {
        res.render('reviews/edit', { hotelId: req.params.id, review: review });
    } else {
        res.send("You don't have permission to edit this.");
    }
});

// 2. UPDATE REVIEW (Edit)
app.put('/hotels/:id/reviews/:reviewId', isLoggedIn, async (req, res) => {
    const review = await Review.findById(req.params.reviewId);

    // Check ownership
    if (review.author.id.equals(req.session.userId)) {
        // Update the specific review
        await Review.findByIdAndUpdate(req.params.reviewId, {
            text: req.body.text,
            rating: Number(req.body.rating)
        });

        // --- RECALCULATE AVERAGE ---
        const hotel = await Hotel.findById(req.params.id).populate('reviews');
        if (hotel.reviews.length > 0) {
            const sum = hotel.reviews.reduce((acc, next) => acc + next.rating, 0);
            hotel.averageRating = sum / hotel.reviews.length;
        } else {
            hotel.averageRating = 0;
        }
        await hotel.save();
        // ---------------------------

        res.redirect('/hotels/' + req.params.id);
    } else {
        res.send("You don't have permission to update this.");
    }
});

// 3. DELETE REVIEW
app.delete('/hotels/:id/reviews/:reviewId', isLoggedIn, async (req, res) => {
    const review = await Review.findById(req.params.reviewId);
    const user = await User.findById(req.session.userId);

    // Allow if User owns the review OR User is Admin
    if (review.author.id.equals(user._id) || user.isAdmin) {

        // 1. Pull the review ID from the Hotel array
        await Hotel.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId } });

        // 2. Delete the Review Document
        await Review.findByIdAndDelete(req.params.reviewId);

        // --- RECALCULATE AVERAGE ---
        const hotel = await Hotel.findById(req.params.id).populate('reviews');
        // Note: The deleted review is already gone from the 'reviews' array because of the $pull above

        if (hotel.reviews.length > 0) {
            const sum = hotel.reviews.reduce((acc, next) => acc + next.rating, 0);
            hotel.averageRating = sum / hotel.reviews.length;
        } else {
            hotel.averageRating = 0;
        }
        await hotel.save();
        // ---------------------------

        res.redirect('/hotels/' + req.params.id);
    } else {
        res.send("You don't have permission to delete this.");
    }
});
// EDIT ROUTE
app.get('/hotels/:id/edit', checkHotelOwnership, async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    res.render('edit', { hotel: hotel });
});

// UPDATE ROUTE
app.put('/hotels/:id', checkHotelOwnership, async (req, res) => {
    await Hotel.findByIdAndUpdate(req.params.id, req.body.hotel);
    res.redirect('/hotels/' + req.params.id);
});

// DESTROY HOTEL ROUTE
app.delete('/hotels/:id', checkHotelOwnership, async (req, res) => {
    await Hotel.findByIdAndDelete(req.params.id);
    res.redirect('/hotels');
});

// REVIEW ROUTES
app.post('/hotels/:id/reviews', isLoggedIn, async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    const user = await User.findById(req.session.userId);

    // Prevent reviewing own hotel
    if (hotel.author.id.equals(user._id)) {
        return res.send("You cannot review your own hotel!");
    }

    const review = await Review.create({
        text: req.body.text,
        rating: req.body.rating,
        author: { id: user._id, username: user.username }
    });

    hotel.reviews.push(review);
    await hotel.save();
    res.redirect('/hotels/' + hotel._id);
});

// DELETE REVIEW (Admin Only)
app.delete('/hotels/:id/reviews/:reviewId', isLoggedIn, async (req, res) => {
    const user = await User.findById(req.session.userId);
    if (user.isAdmin) {
        await Review.findByIdAndDelete(req.params.reviewId);
        res.redirect('/hotels/' + req.params.id);
    } else {
        res.send("Admins only!");
    }
});
// 404 CATCH-ALL ROUTE
// app.get('/(.*)/', (req, res) => {
//     res.render('404');
// });
app.listen(3000, () => console.log('Server running on 3000'));