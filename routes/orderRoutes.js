const express = require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

const router = express.Router();

// 📌 ALL ORDERS
router.get("/", isVerifiedUser, getAllOrders);

// 📌 CREATE ORDER
router.post("/", isVerifiedUser, addOrder);

// 📌 GET SINGLE ORDER
router.get("/:id", isVerifiedUser, getOrder);

// 📌 UPDATE ORDER STATUS
router.put("/:id", isVerifiedUser, updateOrder);
router.route("/:id").delete(isVerifiedUser, deleteOrder);
module.exports = router;
