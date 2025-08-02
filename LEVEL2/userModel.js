const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/secondDatabase`);

const userSchema = new mongoose.Schema({
    imgurl: String,
    useremail: String,
    username: String
});

module.exports = mongoose.model("user", userSchema);