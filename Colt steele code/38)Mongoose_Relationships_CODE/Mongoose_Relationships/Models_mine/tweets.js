const mongoose = require("mongoose");
const { Schema } = mongoose
mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemoMine')
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log("Error:" + err)
    })
const userSchema = new Schema({
    username: String,
    age: Number
})
//one to bajillion relationship where we can have thousands of tweets for a single user so we reference the parent inside the child ie user inside tweets instead of referencing tweets in user.
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})
const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);
const makeUser = async () => {
    const user = new User({ username: "Sameer", age: 22 })
    const res = user.save()
    console.log(res)
}
const makeTweet = async () => {
    const tweet = new Tweet({ text: "yo mama", likes: 6767 });
    const user = await User.findOne({ username: "Sameer" })
    tweet.user = user
    const res = await tweet.save();
    console.log(res);
}
// makeTweet();
Tweet.find({}).populate('user').then(res => console.log(res));
