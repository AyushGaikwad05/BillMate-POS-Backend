require("dotenv").config();
const connectDB =require("./config/database")
const express = require("express");
const config= require('./config/config')
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const createHttpError=require('http-errors');
const cors = require("cors"); 
const cookieParser = require("cookie-parser");
const app=express();

const PORT=config.port;

connectDB();



app.use(
  cors({
    origin: ["billmate-pos.vercel.app"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.get("/",(req,res)=>{
     
    res.json({message:"Hello From BillMate Server"})
    
})

//Middlewares
app.use(express.json());

app.use(cookieParser());
//Other Endpoints
app.use("/api/user",require("./routes/userRoutes"))
app.use("/api/order",require("./routes/orderRoutes"));
app.use("/api/tables",require("./routes/tableRoutes"));
app.use("/api/payement",require("./routes/paymentRoutes"));
//GlobalError Handler

app.use(globalErrorHandler)

app.listen(PORT,()=>{
    console.log("Server Listing On  PORT: ",PORT);
})
