// Mongoose ka kam Node ke server se Mongodb ke server se baat chit karna hai

const express = require("express");
const app = express();

const userModel = require("./userModel");

app.get('/' , (req , res) => {

    res.send("Hey");

})

app.get('/create' ,async (req , res) => {

    let createdUser = await userModel.create({  // This is async operation. So await to make it Sync
        name : "Usernew",
        username : "usernew",
        email : "usernew@gmail.com"
    })

    res.send(createdUser);

})

app.get('/update' ,async (req , res) => {

    // userModel.findOneAndUpdate(findOne , update , {new : true})

    let updatedUser = await userModel.findOneAndUpdate( {username : "usernew"} , {name : "Tutorial User"} , {new : true} );

    res.send(updatedUser);

})

app.get('/read' ,async (req , res) => {

    let user = await userModel.find(); // Find all users and read it. It will give array also if it is empty

    res.send(user);

    // let user = await userModel.findOne( {username: "user"} ); // Find all users with username user. It will give blank with no user. It will give first one only

})

app.get('/delete' ,async (req , res) => {

    let deleteduser = await userModel.findOneAndDelete( {username : "usernew"} ); // Find all users with username user amd delete them

    res.send(deleteduser);

})

app.listen(3000 , () => {

    console.log("Server is Listening on http://localhost:3000")

})