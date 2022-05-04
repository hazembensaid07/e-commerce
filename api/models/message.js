const mongoose =require ("mongoose")

const schema = mongoose.Schema;

//Order Schema
const messageSchema = new schema ({

    //References
    user:{
        type: schema.Types.ObjectId, 
        ref: 'Nuser' 
    },
    product:{
        type: schema.Types.ObjectId, 
        ref: 'product',
        required:false, 
        default:'609612155fdf058cd8a38da9'
    },
    
    message:{
        type:String,
        default:'', 
    },


    //----------------For Admin--------------------
    state:{
        type:String,
    },
    note:{
        type:String,
    },



}, { timestamps: true }//Created at, updated at
);




module.exports=Message=mongoose.model("message",messageSchema);
