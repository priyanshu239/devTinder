// const express = require('express');
// const userRouter = express.Router();

// const { userAuth } = require("../middlewares/auth");
// const ConnectionRequest = require("../models/connectionRequest");

// // Get all the pending connection request for the logged-in user
// userRouter.get("/user/requests", userAuth, async (req, res) => {
//     try {
//         const loggedInUser = req.user; 

//         const connectionRequest = await ConnectionRequest;
//     } catch (err) {
//         res.status(400).send("Error: " + err.message);
//     }
// });

// module.exports = userRouter;
