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

// Trust proxy - MUST be first
app.set("trust proxy", 1);

// ⭐ CORS Configuration - Must be before routes
app.use(
  cors({
    origin: "https://billmate-pos.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// ⭐ Handle OPTIONS requests explicitly
app.options('*', cors());

// Body parsers
app.use(express.json());
app.use(cookieParser());

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