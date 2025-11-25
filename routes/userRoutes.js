const express = require("express");
const router = express.Router();
const {isVerifiedUser} =require('./../middlewares/tokenVerification.js')

const { register, login, getUserData, logout } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/",isVerifiedUser,getUserData);
router.post("/logout",isVerifiedUser,logout);

module.exports = router;
    