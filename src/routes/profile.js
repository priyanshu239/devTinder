const express = require('express');
const validator = require('validator');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const { validateEditProfileData } = require('../utils/validation');
const bcrypt = require('bcrypt');



profileRouter.get("/profile/view",userAuth, async (req, res) => {
    try {
    const user = req.user;
    res.send(user);

    } catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/edit",userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
            // return res.status(400).send("Invalid Edit Request");
        }
        
        const loggedInUser = req.user;

        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);

        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully`,
            data: loggedInUser
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

profileRouter.patch("/profile/password",userAuth, async(req, res) => {
    try{
        const {password} = req.body;
        if(!password) throw new Error("Password is required");
        if(password.length >16 || password.length <4) throw new Error("Please enter 4-16 length pasword");
        if(!validator.isStrongPassword(password)) throw new Error("Please enter a strong password");
        
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update user password
        req.user.password = hashedPassword;
        await req.user.save();

        res.send("Password updated successfully");

    } catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
});


module.exports = profileRouter;