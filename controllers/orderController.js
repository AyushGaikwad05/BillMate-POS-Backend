const createHttpError = require('http-errors');
const Order=require('../models/orderModel');
const mongoose=require("mongoose");
const { create } = require('../models/userModel');
const { json } = require('express');
const addOrder= async (req,res,next)=>{

    try {
        
        const order=new Order(req.body);
        await order.save();
        res.status(201).json({success:true,mesaage:"Order Created!",data:order})
    }

    catch (error)
    {
        next(error); 
    }

}

const getOrder=async (req,res,next)=>{

    try {

            const {id}=req.params; 
            if(!mongoose.Types.ObjectId.isValid(id))
            {
                const error=createHttpError(404,"Invalid ID!");
                return next(error); 
            }
                const order=await Order.findById(id)

                if(!order)
                {
                    const error=createHttpError(404,"Order Not Fond!"); 
                    return next(error); 
                }

                res.status(200).json({success:true,data:order})

    }

    catch(error)
    {
        next(error);
    }
}

const getAllOrders= async (req,res,next)=>{
    try {
            const orders= await Order.find(); 

            if(!orders)
            {
                const error=createHttpError(404,"Orders Are Not Found! ");
                return next(error); 
            }

            res.status(200).json({success:true,data:orders}); 

    }
    catch (error)
    {
            next(error); 
    }

}
const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, "Invalid ID"));
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return next(createHttpError(404, "Order Not Found"));
    }

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
    console.log(error); 
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      return next(createHttpError(404, "Order not found"));
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


module.exports={addOrder,getOrder,getAllOrders,updateOrder,deleteOrder}