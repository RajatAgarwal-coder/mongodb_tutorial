const express = require("express");
const app = express();

const userModel = require("./userModule")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views","views");

app.get("/", (req,res) => {
    res.render("index");
})

app.post("/create",  (req,res) => {

    bcrypt.genSalt(10 ,(err,salt) => {

        bcrypt.hash(req.body.password,salt, async (err,hash) => {
            
            let createdUser = await userModel.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                age: req.body.age
            })

            let token = jwt.sign({email: req.body.email}, "secret");
            res.cookie("token",token)

            res.send(createdUser)

        })

    })
    
    

})

app.get("/login", (req,res) => {
    res.render("login")
})

app.post("/login", async(req,res) => {
    let user = await userModel.findOne({email: req.body.email})
    if(!user) return res.send("Something went Wrong");

    bcrypt.compare(req.body.password , user.password , (err,result) => {

        if (result) {
            let token = jwt.sign({email: user.email}, "secret");
            res.cookie("token",token)
            res.send("Yes You can Login");   
        }

        else res.send("Something went Wrong");

    })
        
})

app.get("/logout", (req,res) => {
    res.cookie("token","");
    res.redirect("/")
})

app.listen(3000 , () => {
    console.log("Server is Listening on http://localhost:3000/")
})