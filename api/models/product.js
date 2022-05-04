const mongoose =require ("mongoose")

const schema = mongoose.Schema;

//Product Schema
const productSchema = new schema ({
    name:{
        type: String,
        trim: true, //remove spaces in the beginning
        required:true,
        max:32,
    },
    price:{
        type:String,
        required:true,
        max:64,
        trim: true,
        default:'0'
    },
    description:{
        type:String,
        max:64,
        default:'Watercolor effect with blue tropical flowers. Splits up both sides, fitted on bust and waist, thick straps, rounded neckline, invisible zip up the back'
    },
    size:{
        type: String,
        trim: true,
        // required:true,
        max:16,
    },
    brand:{
        type: String,
        trim: true, 
        // required:true,
        max:16,
    },
    //shipping method
    shipping:{
        type: String,
        trim: true, 
    },
    likes:{
        type:Number,
        default:0, 
    },
    active:{
        type:Boolean,
        default:true, 
    },
    discount:{
        type:Number,
    },
    type:{
        type:String,
    },
    imgSrc: {
        type: String,
        required: false,
      },
    user:{

    },
    //------------------------------------
    state:{
        type:String,
    },
    note:{
        type:String,
    },
    postedBy:{
        type: schema.Types.ObjectId, 
        ref: 'Nuser' 
    },


}, { timestamps: true }//Created at, updated at
);




module.exports=Product=mongoose.model("product",productSchema);
