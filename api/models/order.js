const mongoose =require ("mongoose")

const schema = mongoose.Schema;

//Order Schema
const orderSchema = new schema ({

    //References
    product:{
        type: schema.Types.ObjectId, 
        ref: 'product' 
    },
    seller:{
        type: schema.Types.ObjectId, 
        ref: 'Nuser' 
    },
    buyer:{
        type: schema.Types.ObjectId, 
        ref: 'Nuser' 
    },
    
    confirmed:{
        type:String,
        default:false, 
    },
    delivered:{
        type:String,
        default:false, 
    },
    address:{
        type:String,
    },

    contact:{
        type:String,
    },

    //------------------------------------
    state:{
        type:String,
    },
    note:{
        type:String,
    },



}, { timestamps: true }//Created at, updated at
);




module.exports=Order=mongoose.model("order",orderSchema);
