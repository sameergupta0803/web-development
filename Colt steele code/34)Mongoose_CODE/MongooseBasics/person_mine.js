const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log("Error:" + err)
    })
const personSchema = new mongoose.Schema({
    first: String,
    last: String
})
personSchema.virtual('fullname').get(function () {
    return `${this.first} ${this.last}`
})
    .set(function (full) {
        this.first = full.substr(0, full.indexOf(' '))
        this.last = full.substr(full.indexOf(' ') + 1)
    })
//All instances of Person can use this fullname property.The get function returns the value when we call the fullname property and set function is used for setting/changing the value for fullname 
personSchema.pre('save', async function () {
    // this.first = "Yo",
    //     this.last = "MAMA!"
    console.log("just about to save")
})
//This will run before saving newPerson
personSchema.post('save', async function () {
    console.log("After save")
})
//Will run after saving newPerson
const Person = mongoose.model('Person', personSchema);
const newPerson = new Person({
    first: "Yashika",
    last: "Singh"
})
// newPerson.fullname returns Sameer Gupta.Added as a property
newPerson.save()