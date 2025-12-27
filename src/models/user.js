const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required: true,
        minLength: 4,
        maxLength: 14,
    },
    lastName: {
        type: String,
        maxLength: 14,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 16,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        // this validation function will only work when we are signing a new user 
        // if we want to update a user details it will not work
        // we have to enable it to run on updates also 
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
    },
    about: {
        type: String,
        default: "This is a default about of the user",
    },
    skills: {
        type: [String]
    },
    // timestamps is for storing time when the user registered on our platform
}, {timestamps :true});





module.exports = mongoose.model("User", userSchema);
