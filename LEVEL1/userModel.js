const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/firstDatabase`); // 27017/database_name is a port of Mongodb

const userSchema = mongoose.Schema({   // It accepts Object. Har user ke pass kya kya details hogi

    name : String,
    username : String,
    email : String

})

// On basis of model we can do CURD

module.exports =  mongoose.model("user",userSchema); // (isnamekapurralformkaversionbanega , Schemawhichwewanttouse)