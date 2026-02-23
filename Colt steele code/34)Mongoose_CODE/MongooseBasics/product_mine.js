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
        required: true,//makes the field compulsary to add
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be positive!"]//helps us print the error if price is lower than 0
    },
    onSale: {
        type: Boolean,
        default: false//default value for the field
    },
    categories: [String],//list of strings
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']//size can only be these 3 values and nothing else
    }
})
// const Product = mongoose.model('Product', productSchema);
// const newProduct = new Product({ name: "T-Shirt", price: 20, categories: ["Clothing"], size: 'M' })
// newProduct.save()
//     .then((res) => {
//         console.log(res)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: 15 }, { new: true, runValidators: true }).then((res) => {
//     console.log(res)
// })
//we need to pass runValidators:true in update statement so that the updated value satisfies the contrainsts
// productSchema.methods.greet = function () {
//     console.log("HELLLO!!! HI!! HOWDY!!! ")
//     console.log(`- from ${this.name}`)
// }
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save()
}
//we can add custom functions for a given model.Make sure to define them before model()
productSchema.methods.addCategory = function (cat) {
    this.categories.push(cat);
    return this.save()
}
productSchema.statics.fireSale = function () {
    console.log("In firesale");
    return this.updateMany({}, { onSale: true, price: 10 })
}
const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Bike helmet' });
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
    await foundProduct.addCategory('Helmet')
    console.log(foundProduct)
}
//using async functions for database operations.No need for then as we get the result for when we have a success.We havent done any error handling here for an error
// findProduct()
Product.fireSale().then((res) => console.log(res))//doesnt seem to work without then