const mongoose = require("mongoose");
const Product = require("./models/product_mine")
mongoose.connect('mongodb://127.0.0.1:27017/farmStand', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log("Error:" + err)
    })
// const newProduct = new Product({ name: "cottage cheese", price: 5, category: "Dairy" });
// newProduct.save()
//     .then((res) => {
//         console.log(res)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
const seedProducts = [
    {
        name: "Cucumber",
        price: 2,
        category: "vegetable"
    },
    {
        name: "Tomato",
        price: 1.5,
        category: "Fruit"
    },
    {
        name: "Milk",
        price: 1,
        category: "Dairy"
    }
]
Product.insertMany(seedProducts)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })