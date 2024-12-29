const mongoose = require("mongoose");

const cors = require('cors');


const connectDatabase = async ()=>{

    await mongoose.connect(process.env.DB_URL)
    .then((data)=>{
        console.log(`Database Connection successfull`)
    })
    .catch((e)=>{
        console.log(`Database Connectiion Error: ${e}`)
    })
}

module.exports = connectDatabase