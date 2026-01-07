require("dotenv").config();
const connectDB = require("./config/database");
const express = require("express");
const config = require('./config/config');
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const createHttpError = require('http-errors');
const cors = require("cors"); 
const cookieParser = require("cookie-parser");
const app = express();

const PORT = config.port;

// Connect to database
connectDB();

// Trust proxy - MUST be first
app.set("trust proxy", 1);

// CORS Configuration
app.use(
  cors({
    origin: "https://billmate-pos.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
    optionsSuccessStatus: 204
  })
);

// Body parsers
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Hello From BillMate Server" });
});

// API Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/tables", require("./routes/tableRoutes"));
app.use("/api/payement", require("./routes/paymentRoutes"));

// Global Error Handler (must be last)
app.use(globalErrorHandler);

// Start server
app.listen(PORT, () => {
    console.log("Server Listening On PORT:", PORT);
});