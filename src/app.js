const express = require('express')
const app = express();

app.get("/user", (req, res, next) => {

    console.log("Handling the route user !!");
    // res.send("Response !!");
    next();
},
 (req, res, next) => {
    // route handler 2
    console.log("Handling the route user 2!!");
    // res.send("2nd Response !!");
    next();
},
 (req, res, next) => {
    console.log("Handling the route user 3!!");
    // res.send("3rd response");
    next();
 },
  (req, res, next) => {
    console.log("Handling the route user 4!!");
    res.send("4th response");
  }
);
 
app.listen(7777, ()=> {
    console.log("Server is successfully listening on port :7777")
});   