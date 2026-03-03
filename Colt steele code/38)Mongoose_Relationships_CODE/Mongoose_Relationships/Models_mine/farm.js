const mongoose = require("mongoose");
const { Schema } = mongoose
mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemoMine')
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log("Error:" + err)
    })
const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ["Spring", "Winter", "Summer", "Fall"]
    }
})
//one to many relationship,referencing products inside farmSchema which stores the ObjectId of productSchema.We reference the child in parent
const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})
const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);
const makeFarm = async () => {
    const farm = new Farm({ name: "Gupta farms", city: 'Mumbai,Maharashtra' });
    const watermelon = await Product.findOne({ name: "Watermelon" });
    farm.products.push(watermelon)
    const res = await farm.save();
    console.log(res);
}
const addProduct = async () => {
    const farm = await Farm.findOne({ name: "Gupta farms" });
    const product = await Product.findOne({ name: "Orange" });
    farm.products.push(product);
    const res = await farm.save();
    console.log(res);
}
Farm.findOne({ name: 'Gupta farms' }).populate('products').then(res => console.log(res))
//we use populate('products') to display the full details of the products inside the farm.

// addProduct();
// makeFarm()
// Product.insertMany([
//     { name: 'Watermelon', price: 15, season: "Spring" },
//     { name: 'Orange', price: 5, season: "Fall" },
//     { name: 'Kiwi', price: 25, season: "Summer" }
// ])