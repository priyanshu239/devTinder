const mongoose  = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



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
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email id is not valid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 90,
        validate(value){
            if (!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password")
            }
        }
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
        default: "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Photo URL is invalid :" + value);
             
           }
       },
    },
    about: {
        type: String,
        default: "This is a default about of the user",
    },
    skills: {
        type: [String],
        validate(arr) {
            if(arr.length >10) {
                throw new Error("Maximum 10 are skills allowed to enter")
            }
        }
    },
    // timestamps is for storing time when the user registered on our platform
}, {timestamps :true});


// does not work in arrow function
userSchema.methods.getJWT = async function() {
    const user = this;

    const token = await jwt.sign({ _id: user._id}, "RANDOMsecert@key778", {expiresIn: "7d"});
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}


module.exports = mongoose.model("User", userSchema);
