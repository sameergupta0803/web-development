const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log("Error:" + err)
    })
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    }
})
const Product = mongoose.model('Product', productSchema);
const newProduct = new Product({ name: "bike", price: 300 })
newProduct.save()
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })