const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");

dotenv.config();


const app = express();




// using cookie parser
app.use(cookieParser());



// Enable CORS


const corsOrigin ={
    origin:`${process.env.FRONTEND_URL}`, //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));


console.log(`front end url is : ${process.env.FRONTEND_URL}`)


  

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
