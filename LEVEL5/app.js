const express = require("express");
const app = express();
const userModel = require("./userModule");
const postModel = require("./postModule");

app.get("/",(req,res) => {
    res.send("Working Properly");
})

app.get("/create", async (req,res) => {

    let user = await userModel.create({
        username: "Rajesh Khana",
        email: "khana123@gmail.com",
        age: 25,
    })

    res.send(user);

})

app.get("/post/create", async (req,res) => {

    let post = await postModel.create({
        postdata: "Data of the Post",
        user: "688f427bd54c21d88c96a923"
    })

    // User ko bata rahe hai post id
    let user = await userModel.findOne({"_id": "688f427bd54c21d88c96a923"}); 
    user.posts.push(post._id);
    await user.save(); // without update we have to save like this

    res.send({post,user});

})

app.listen(3000 , () => {
    console.log("Server is Listening on http://localhost:3000/")
})