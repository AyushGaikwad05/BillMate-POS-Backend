const mongoose=require('mongoose');

const orderSchema= new mongoose.Schema ({
    customerDetails:{
        name:{
            type:String,
            required:true,

        },

        phone:{
            type:Number,
            required:true,
        },
        guests:{
            type:Number,
            required:true
        }
    },
    orderStatus:{
        type:String,
        required:true 
    },
    orderDate:{
        type:Date,
        default:Date.now()
    },

    bills:{
        total:{
            type:Number,
            required:true
        },
        tax:{
            type:Number,
            required:true
        },
        totalWithTax:{
            type:Number,
            required:true
        }
    },
    items:[],
    table:{
        type:mongoose.Schema.Types.ObjectId,ref:"Table"
    },
    paymentMethod:{
        type:String
    },
    tableNumber: {
  type: Number,
  required: true
},
},{timestamps:true})

module.exports=mongoose.model("Order",orderSchema);
