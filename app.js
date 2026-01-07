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

connectDB();

// ⭐ MIDDLEWARE ORDER IS CRITICAL - Must be BEFORE routes
app.set("trust proxy", 1); // Should be first

// CORS must be early
app.use(
  cors({
    origin: "https://billmate-pos.vercel.app", // ✅ Your frontend URL
    credentials: true, // ✅ Allows cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // ⭐ Add this
    allowedHeaders: ['Content-Type', 'Authorization'], // ⭐ Add this
  })
);

// Body parsers
app.use(express.json());
app.use(cookieParser()); // ✅ Now in correct position

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Hello From BillMate Server" });
});

// Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/tables", require("./routes/tableRoutes"));
app.use("/api/payement", require("./routes/paymentRoutes"));

// Global Error Handler (must be last)
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log("Server Listening On PORT:", PORT);
});