const express = require('express');
const app = express();
const path = require('path')
const methodOverride = require('method-override')
const Product = require('./models/product_mine')
const port = 3000;
const mongoose = require("mongoose");
const categories = ['vegetable', 'fruit', 'dairy']
mongoose.connect('mongodb://127.0.0.1:27017/farmStand', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log("Error:" + err)
    })
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set(path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index_mine', { products })
})
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/products')
})
app.get('/products/new', (req, res) => {
    res.render('products/new_mine', { categories })
})
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show_mine', { product })
})
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.redirect(`/products/${id}`)
})
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit_mine', { product, categories })
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})