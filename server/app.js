const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');



const app = express();




// using cookie parser
app.use(cookieParser());



// Enable CORS
const corsOrigin ={
    origin:'http://localhost:5173', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));


  

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const user = require("./routes/userRoute.js");
const task = require("./routes/taskRoute.js")


//handling with versions
app.use("/api/v1", user);
app.use("/api/v1", task);



// adding for show message on get Request
app.get("/", (req, res)=>{
    res.send("Server is working fine!");
})

module.exports = app;
