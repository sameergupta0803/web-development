const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'password cannot be blank']
    }
})
userSchema.statics.findAndValidate = async function (username, password) {
    const user = await this.findOne({ username })
    if (!user) return false;
    const isValid = await bcrypt.compare(password, user.password)
    return isValid ? user : false;
}
//finds and validates the user when logging in,if password is wrong or is username doesnt exist,we return false.
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, 12);
    return
})
//hashes the password before saving to the database.Make sure not to use anonymous function as the 'this' will not refer to the model
module.exports = mongoose.model('User', userSchema)