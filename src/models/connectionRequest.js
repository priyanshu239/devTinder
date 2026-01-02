const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored","interested","accepted","rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }
},{timestamps: true});


// connectionRequestSchema.pre("save", function () {
//     const connectionRequest = this;
//     // CHECK IF THE FROM USER ID IS SAME AS TO USER ID
//     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
//         throw new Error("Cannot send connection request to yourself");
//     }
//     next();
// });

// ConnectionRequest.find({fromUserId: 89398173814308, toUserId: 80147870938247})
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;