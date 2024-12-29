const app = require("./app");
const dotenv = require("dotenv");

//config
dotenv.config();

const connectDatabase = require("./db/conn.js");


connectDatabase();


//DB

process.env.PORT;

// connectDatabase();







const server = app.listen(process.env.PORT, (err)=>{
    if(err) console.log("error hai => "+ err)
    console.log(`Server is working on http://localhost:${process.env.PORT}`)

})

  
process.on("unhandledRejection",(err)=>{
    console.log(`Err: ${err.message}`);
    console.log(`Shutting down the serverdue to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })

})