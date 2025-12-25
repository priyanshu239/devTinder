const express = require('express')
const app = express();


app.use("/user",(req, res) => {
    res.send("hahahaha");
});

// this will only handle GET method 
app.get("/user", (req, res) => {
    res.send({firstName : "priyanshu", lastname : "kumar"});
});

// this will only handle POST method
app.post("/user", (req, res) => {
    res.send("Data successfully saved to the database");
});
// this will only handle DELETE method
app.delete("/user", (req, res) => {
    res.send("User successfully deleted from the database !");
});

// this will match all the https method API calls to /test
app.use("/test",(req, res) => {
    res.send("Hello from the server !");
});

app.listen(7777, ()=> {
    console.log("Server is successfully listening on port :7777")
});  