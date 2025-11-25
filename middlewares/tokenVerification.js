const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config/config.js");

const isVerifiedUser = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            return next(createHttpError(401, "Please Provide Token!"));
        }

        // Verify token
        const decoded = jwt.verify(accessToken, config.accessTokenSecret); 

        // Find user
        const user = await User.findById(decoded._id);

        if (!user) {
            return next(createHttpError(401, "User Not Exist!"));
        }

        req.user = user;  
        return next();

    } catch (error) {
        return next(createHttpError(401, error.message || "Invalid Token"));
    }
};

module.exports = { isVerifiedUser };
