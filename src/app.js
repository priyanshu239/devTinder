const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// Reads the json object convert it into javascript object
app.use(express.json());

app.post("/signup", async (req, res) => {

    // Creating a new instance of the user model
    const user = new User(req.body);

    try{ 
        // New document will be collected in the user collection in the devTinder database
        await user.save();
        res.send("User added succesfully");
    } catch (err) {
        res.status(400).send(" Error saving user :" + err.message);
    }

});

// Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{
        const user = await User.findOne({emailId: userEmail});
        if(!user) {
            res.status(400).send("Something went wrong");
        }
        else {
            res.send(user);
        }
        // const users = await User.find({ emailId: userEmail });
        // if(users.length === 0){
        //     res.status(404).send("User not found");
        // }else {
        //     res.send(users);
        // }
        
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
    
});


// Feed API - Get / feed - get all the users from the database
app.get("/feed", async (req, res) => {    
    try{
        const users = await User.find({});
        if(users.length === 0){
            res.status(404).send("User not found");
        }else {
            res.send(users);
        } 
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});


// Start the server only after the database is connected succesfully 
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








