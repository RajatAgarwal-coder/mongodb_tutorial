const Mongoose = require("mongoose");

const postSchema = Mongoose.Schema({
    postdata: String,
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now   
    }
})

module.exports = Mongoose.model("post",postSchema);