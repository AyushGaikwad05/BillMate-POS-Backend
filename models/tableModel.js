const mongoose=require('mongoose'); 

const tableSchemea= new mongoose.Schema ({
    tableNo:{
        type:Number,
        required:true,
        unqiue:true
    },
    status:{
        type:String,
        default:"Available"
    },

    seats:{
            type:Number,
            required:true
    },

    currentOrder:{
        type:mongoose.Schema.Types.ObjectId,ref:"Order"
    }
})

module.exports=mongoose.model("Table",tableSchemea);