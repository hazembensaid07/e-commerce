const mongoose =require ("mongoose")
const crypto = require('crypto');

const schema = mongoose.Schema;

//User Schema
const userSchema = new schema ({
    posts: [{ type: schema.Types.ObjectId, ref: 'product' }],
    imgSrc: {
        type: String,
        required: false,
      },
    username:{
        type: String,
        trim: true, //remove spaces in the beginning
        required:true,
        max:32,
        unique:true
    },
    first_name:{
        type: String,
        trim: true, //remove spaces in the beginning
        required:true,
        max:16,
    },
    last_name:{
        type: String,
        trim: true, //remove spaces in the beginning
        required:true,
        max:16,
    },

    email:{
        type: String,
        trim: true, //remove spaces in the beginning
        required:true,
        lowercase:true,
        unique:true,
    },
    phone:{
        type: String,
        trim: true,
        default:''
    },
    birth_date:{
        type: Date,
        default:'1999-09-07'
    },
    location:{
        type:String,
        default:'Your location!'
    },
    profile_description:{
        type:String,
        max:64,
        default:'Add a description to your profile'
    },
    state:{
        type:String,
    },
    note:{
        type:String,
    },
    profile_likes:{
        type:Number,
        default:0, 
    },
    Verification:{
        type:Boolean,
        default:false,
    },

    hashed_password: {
        type: String,
        required: true
        },

    salt: String, //Will define how strong the hashed paswword is 
        
    role: {
            type: String,
            default: 'subscriber'
        },
        
    resetPasswordLink: { //Generate token and save it in the DB then send the token by email to the user then verify
            data: String,
            default: ''
        }
    


}, { timestamps: true }//Created at, updated at
);


//Virtual fear : take the password and hash the password then save it

userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
})

.get(function(){
    return this._password
})


// Methods

userSchema.methods ={
    authenticate : function (plainText){
        return this.encryptPassword(plainText) == this.hashed_password
      },

    encryptPassword : function(password){
            if(!password) return ''

            try {
                return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
            } catch (error) {
                return ''
            }
    },
    

    makeSalt : function() {

        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
}


module.exports=User=mongoose.model("Nuser",userSchema);
