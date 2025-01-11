import express from "express"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import {createServer } from "http";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv(); 


const app = express();

const corsOptions = {
    origin: `${process.env.FRONTEND_URL}`,  // Allow requests from this origin
    methods: 'GET,POST',  // Allowed HTTP methods
    credentials: true,  // Allow cookies and authorization headers
    optionsSuccessStatus: 200,  // For legacy browser support (optional)
  };
  
  // Use CORS middleware with the configured options
  app.use(cors(corsOptions));
  


const server = createServer(app);

const io = new Server(server, {
    cors:corsOptions
});

const connectedUsers = {}; // Store connected users with their IDs

io.on("connection", (socket) => {
  console.log(`Connection attempt: ${socket.id}`);

  // Handle name submission
  socket.on("setName", (name, callback) => {
    if (!name || name.trim() === "") {
      console.log(`Rejected connection: ${socket.id}, invalid name.`);
      callback({ success: false, message: "Name is required!" });
      socket.disconnect();
    } else {
      connectedUsers[socket.id] = name.trim();
      console.log(`User connected: ${socket.id} with name: ${name}`);
      callback({ success: true, message: "Connected successfully!", id:socket.id});

      // Notify all clients about updated user list
      io.emit("updatedUserList", connectedUsers);
    }
  });

  // Handle messaging
   {/* 
        from: "room"
        to: "room"
        message: "message from the user"
        */}

  socket.on("sent-message", (data) => {
    console.log(data);

    if (data.to && connectedUsers[data.to]) {
      socket.to(data.to).emit("receive-message", {
        from: data.to,
        to:socket.id,
        message: data.message,
      });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    delete connectedUsers[socket.id];
    io.emit("updatedUserList", connectedUsers); // Notify all clients
  });
});




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
import user from "./routes/userRoute.js";
import task from "./routes/taskRoute.js";


//handling with versions
app.use("/api/v1", user);
app.use("/api/v1", task);



// adding for show message on get Request
app.get("/", (req, res)=>{
    res.send("Server is working fine!");
})

export default server;
