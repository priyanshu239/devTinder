const express = require('express');
const requestRouter = express.Router();
const User = require("../models/user")
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest');




requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req, res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
       
        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type: " + status});
        }

        // this is also written in schema using pre
        if(toUserId == fromUserId) return res.status(400).send("from userid and to userid can't be same")

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message: "User not found"});
        }
        
        // If there is an existing ConnectionRequest
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId,toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ],
        });
        if(existingConnectionRequest) {
            return res.status(400).send({
                message: "Connection request already exists !"
            })
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })

        const data = await connectionRequest.save();

        res.json({
            message: req.user.firstName  + status + " in " + toUser.firstName,
            data,
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

// requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res) => {
//     try{
//         const loggedInUser = req.user;

//     } catch (err){
//         res.status(400).send("Error: ", err.message);
//     }
// });

module.exports = requestRouter;