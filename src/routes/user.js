const express = require('express');
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const Users = require("../models/user")

// Get all the pending connection request for the logged-in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName photoUrl age gender about skills");
        // }).populate("fromUserId", ["firstName", "lastName"]);


        res.json({message: "Data fetched successfully ", data: connectionRequest})
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const connectonRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", "firstName lastName photoUrl age gender about skills")
          .populate("toUserId", "firstName lastName photoUrl age gender about skills");

            console.log(connectonRequests);
        const data = connectonRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId;
        });
        res.json({data: data});
    } catch (err){
        res.status(400).send({message: err.message});
    }
});

userRouter.get("/feed", userAuth, async (req , res) => {
    try{

        // user should see all the other user card except
        // 1. his own card
        // 2. his connections
        // 3. ignored people
        // 4. already sent the conection request

        const loggedInUser = req.user;

        // Find all the connection request (sent+ receivd)
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await Users.find({
           $and:  [ 
                {_id: { $nin: Array.from(hideUsersFromFeed) },}, 
                {_id: { $ne: loggedInUser._id} },
           ],
        }).select("firstName lastName photoUrl age gender about skills");

        res.send(users);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});


module.exports = userRouter;
