const Mongoose = require("mongoose");
Mongoose.connect("mongodb://localhost:27017/fifthdatabse");

const userSchema = Mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: [
        {
            type: Mongoose.Schema.Types.ObjectId,  // Isse yaha kaha rahe hai ki posts ka type id hai
            ref: "post" // Ye post postModule se aane waali hai
        } 
    ]
})

module.exports = Mongoose.model("user",userSchema);