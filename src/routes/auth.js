const express = require('express');
const authRouter = express.Router();

const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const validator = require('validator');

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async(req,res) => {
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
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid) {
            // create a JWT token (schema methods in user.js)
            const token = await user.getJWT();         

            // add the token to cookie and send the response back to user
            res.cookie("token",token, {
                expires: new Date(Date.now()+ 8*3600000)} 
            );
            res.send("login succesful");

        } else {
            throw new Error("Incorrect Password");
        }

    } catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/logout", async(req, res) => {
    res.cookie("token", null, {expires: new Date(Date.now())});
    res.send("Logout Successfull !!");
});

module.exports = authRouter;