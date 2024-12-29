const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');



const app = express();




// using cookie parser
app.use(cookieParser());



// Enable CORS

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client's origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
  

app.use(cors(corsOptions));

  

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
