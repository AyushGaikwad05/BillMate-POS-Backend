const mongoose =require("mongoose")
const config=require("./config")
const connectDB= async ()=>{
    try{
        const conn=await mongoose.connect(config.databaseURL)
        console.log(`MongDB COnnected: ${conn.connection.host}`)
    }
    catch (error) {
            console.log(`Connection error mongodb:  ${error.message}`)
            process.exit();
    }
}

module.exports=connectDB;