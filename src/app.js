const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
    // creating a new instance of the user model
    const user = new User({
        firstName : "sachin tendulka",
        lastName : "kumar",
        emailId : "sachin@gmail.com",
        password : "abcd1234",
    });
    try{
        await user.save();
        res.send("User added succesfully");
    } catch (err) {
        res.status(400).send(" Error saving user :" + err.message);
    }

});


// start the server only after the database is connected succesfully 
connectDB()
.then(() => {
    console.log("Database connected succesfully....");
    app.listen(7777, ()=> {
    console.log("Server is successfully listening on port :7777.....");
  });   
})
.catch(err=> {
    console.error("database can't be connected");
});








