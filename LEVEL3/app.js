    const express = require("express");
    const app = express();
    const path = require("path");

    const cookieParser = require("cookie-parser"); // Used to read Cookie
    app.use(cookieParser());

    const jwt = require("jsonwebtoken"); // Used to make that string encrypted

    const bcrypt = require("bcrypt"); // Used for Encryption and Decryption

    app.set("view engine","ejs");
    app.set("views","views");

    app.use(express.static(path.join(__dirname,"public")));
    app.use(express.urlencoded( {extended : true} ));

    app.get("/",(req,res) => {

        // To Add Cookies
        res.cookie("name","Rajeshwar"); // Name wali cookie jiska data hoga rajesh
        res.render("index");

        let token = jwt.sign({email: "user06@gmail.com"}, "secret");
        res.cookie("token", token);
        console.log(token)

        // Encrypting the Password

        bcrypt.genSalt(10, (err ,salt) => {

            bcrypt.hash("My_Password" ,salt , (err ,hash) => {
                console.log(hash); // You can store this hash in your database
            })

        })

        // Decrypting the Password :- Decrypt nahi hota compare hota hai
        // bycrpt.compare(password,hash,(err,res))

        bcrypt.compare("My_Password", "$2b$10$W5FF29SuFaIxWEnXQ0Zxk.6zWlKOSqhbizZE8uN/OAAE6Qvy7i8hm", (err, result) => {
            console.log(result);
        })

        // Agli koi bhi request ya page pe aap jaoge to cookie aapke sath jaegi

    })

    app.get("/read",(req,res) => {

        console.log(req.cookies.token);
        console.log(req.cookies);
        res.send("Read Page");
        // Authorization Header hamesa req mai laga kar bhejna hota hai

        // To take out data from token
        let data = jwt.verify(req.cookies.token ,"secret");
        console.log(data); // This is the data we check for user 
    })

    app.listen(3010, () => {

        console.log("Server is listening on http://localhost:3010")

    })