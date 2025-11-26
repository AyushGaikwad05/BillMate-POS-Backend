const createHttpError = require("http-errors");
const User = require("./../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config.js')

const register = async (req, res, next) => {
    try {
        const { name, phone, email, password, role } = req.body;
        if (!name || !phone || !email || !password || !role) {
            const error = createHttpError(400, "All Fields Are Required!")
            return next(error);
        }

        const isUserPresent = await User.findOne({ email });
        if (isUserPresent) {
            const error = createHttpError(400, "User Already Exists!");
            return next(error);
        }

        const user = { name, email, phone, password, role };
        const newuser = User(user);
        await newuser.save();

        res.status(201).json({ success: true, message: "New User Created!", data: newuser })


    }
    catch (error) {
        next(error)
    }

}


const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = createHttpError(400, "All Fields Are Required !")
            return next(error);

        }

        const isUserPresent = await User.findOne({ email });

        if (!isUserPresent) {
            const error = createHttpError(401, "Invalid Credentials");
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, isUserPresent.password);
        if (!isMatch) {
            const error = createHttpError(401, "Invalid Credentials");
            return next(error);
        }

      const accessToken = jwt.sign(
  { _id: isUserPresent._id },   // ✅ CORRECT
  config.accessTokenSecret,
  { expiresIn: "1d" }
);

       console.log("SECRET:", config.accessTokenSecret);

    // ---------------------------------------------------
    // ⭐ CORRECT COOKIE SETTING (your main issue)
    // ---------------------------------------------------
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });



        res.status(200).json({ success: true, message: "User Login Successfully!", data: isUserPresent })

    } catch (error) {
        next(error);
    }
}

const getUserData = async (req, res, next) => {

    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ success: true, data: user })
    } catch (error) {
        return next(error);
    }
}


const logout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken');
        res.status(200).json({ sucess: true, message: "User logout successfully" });
    }

    catch (error) {
        next(error);
    }
}

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, config.accessTokenSecret);

    res.status(200).json({
      success: true,
      message: "Token valid",
      userId: decoded._id,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};




module.exports = { register, login, getUserData, logout,verifyToken };