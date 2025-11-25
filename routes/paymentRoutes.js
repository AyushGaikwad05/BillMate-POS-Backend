const express=require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { createOrder } = require("../controllers/payementController");
const router=express.Router();

router.route("/create-order").post(isVerifiedUser,createOrder); 

module.exports=router; 