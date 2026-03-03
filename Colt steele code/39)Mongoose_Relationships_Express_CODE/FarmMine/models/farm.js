const mongoose = require('mongoose');
const Product = require('./product')
const { Schema } = mongoose
const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, "Farm must have a name"]
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Farm must have an email"]
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

// farmSchema.post('findOneAndDelete', async (data) => {
//     if (data.products.length) {
//         const res = await Product.deleteMany({ _id: { $in: data.products } })
//         console.log(res)
//     }
// })

farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
        const res = await Product.deleteMany({ _id: { $in: farm.products } })
        console.log(res);
    }
})
//mongoose middleware used to delete all the products accociated with a farm in the products model after we delete a farm.Here 'farm' refers to the document being deleted. post middleware runs after the operation has been performed and pre middleware runs before the operation.We need to add these middlewares to the schema.
const Farm = mongoose.model('Farm', farmSchema)


module.exports = Farm