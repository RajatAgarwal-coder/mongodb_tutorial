const express = require("express");
const userModel = require("./userModel");
const path = require('path');

const app = express();

app.use(express.urlencoded( {extended : true} ))
app.use(express.static(path.join(__dirname , "public")))

app.set("view engine","ejs");
app.set("views","views")

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/read", async(req, res) => {

    let alluser = await userModel.find()

    res.render("read" , {users : alluser});
});

app.get("/delete/:id", async(req, res) => {

    let alluser = await userModel.findOneAndDelete( { _id : req.params.id} )

    res.redirect("/read");
});

app.get("/edit/:userid", async (req, res) => {

    let user = await userModel.findOne({_id : req.params.userid});

    res.render("edit" , {user}); // {user : user} == {user}

});

app.post("/update/:userid", async (req, res) => {

    let user = await userModel.findOneAndUpdate({_id : req.params.userid} ,
        {imgurl:req.body.imgurl, useremail:req.body.email ,username:req.body.name} ,
        {extended : true});

    res.redirect("/read")

});

app.post("/create", async (req, res) => {
    
    let createdUser = await userModel.create({
        imgurl: req.body.imgurl,
        useremail: req.body.email,
        username: req.body.name
    })

    res.redirect("/read")

});

app.listen(3000, () => {
    console.log("Server is Listening on http://localhost:3000");
});
