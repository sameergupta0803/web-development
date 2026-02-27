const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemoMine')
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log("Error:" + err)
    })
//one to few relationship,embedding addresses array of objects directly inside userSchema
const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: { _id: false },
            city: String,
            state: String,
            country: String
        }
    ]
})
const User = mongoose.model('User', userSchema);
const makeUser = async () => {
    const newUser = new User({
        first: "Sameer",
        last: "Gupta"
    })
    newUser.addresses.push({
        city: "Mumbai",
        state: "Maharashtra",
        country: "India"
    })
    const res = await newUser.save();
    console.log(res);
}
const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        city: "Noida",
        state: "Uttar pradesh",
        country: "India"
    })
    const res = await user.save()
    console.log(res)
}
// makeUser()
// addAddress('69a203795bfdc3cadd9ce6f4')
// User.insertOne({
//     first: 'Harry',
//     last: 'Potter'
// })