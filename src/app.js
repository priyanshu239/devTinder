const express = require('express')
const app = express();

app.get("/getUserData", (req, res) => {
    // try {
    //     // Logic of DB call and get user data
         throw new Error("ikjbdujbc"); 
         res.send("User data sent");
    // } catch (err) {
    //     res.status(500).send("Something went wrong");
    // } 
});

app.use("/", (err, req, res, next) => {
    if (err) {
      // Log your error
     res.status(500).send("somehting went wrong");
    }
});

app.listen(7777, ()=> {
    console.log("Server is successfully listening on port :7777")
});   