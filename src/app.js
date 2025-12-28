const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require('bcrypt');
const validator = require('validator');


// Reads the json object convert it into javascript object
app.use(express.json());

// create new user
app.post("/signup", async (req, res) => {
    try{ 
    // Validation of data
    validateSignUpData(req);

    const {firstName, lastName, emailId, password} = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // if user already exist with same email
    const existingUser = await User.findOne({emailId});
    if(existingUser) return res.status(409).send("Email already exist");

    // Creating a new instance of the user model
    const user = new User({
        firstName, lastName, emailId, password:passwordHash,
    });

    
        // New document will be collected in the user collection in the devTinder database
        await user.save();
        res.send("User added succesfully!");
    } catch (err) {
        res.status(400).send(" ERROR :" + err.message);
    }

});
// login user
app.post("/login", async(req,res) => {
    try{
        const {emailId, password} = req.body;
        if (!emailId || !password) {
            throw new Error("Email and password are required");

        }
        if(!validator.isEmail(emailId)){
            throw new Error("Invalid Email address");
        }
        const user  = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid) {
            res.send("Login Successful!");
        } else {
            throw new Error("Incorrect Password");
        }

    } catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

// Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({ emailId: userEmail });
        if(users.length === 0){
            res.status(404).send("User not found");
        }else {
            res.send(users);
        }
        
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

// Delete a user from database
app.delete("/user", async (req, res) => {
    try{
        const userId = req.body.userId;
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");

    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
    // ? -> is userId not present code will not fail
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    
        // Looping through all the keys(userId, emailId, gender etc) and checking it should be preseng in ALLOWED_UPDATES
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        // ALREADY ADDED THIS VALIDATOR IN SCHEMA
        // if(data?.skills.length > 10){
        //     throw new Error("Skills can't be more than 10")
        // }
        
        const user = await User.findByIdAndUpdate({_id: userId}, data, {
            returnDocument: "after",
            runValidators: true,
        });
        // see the data before update
        console.log(user);
        res.send("User updated successfully");

    } catch (err){
        res.status(400).send("Update Failed" + err.message);
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








