const express=require("express")
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const dbConnect= require("./config/connectDB.js");
const app = express();

//connect DB
dbConnect();

//app middleware
app.use(morgan('dev'))  //returns the status request
    // app.use(cors());    //allows any other origin to make request to our server
if ((process.env.NODE_ENV='development')){
    app.use(cors({origin:'http://localhost:3000'}))
}

//Create folder where we will upload images
app.use('/client/public/uploads',express.static('client/public/uploads'))
app.use('/client/public/uploads/ProductsImages',express.static('client/public/uploads/ProductsImages'))



// create route
//middleware routing body parser
app.use(express.json());
// app.use(bodyParser.json());
app.use("/api/auth",require("./routes/authNew"));
app.use("/api/user",require("./routes/userNew"));
app.use("/api/product",require("./routes/product"));
app.use("/api/order",require("./routes/order"));

app.use("/api/message",require("./routes/message"));


const PORT = process.env.PORT

app.listen(PORT,(err)=>
    err?console.error("Server connection error",err):console.log("Server is running")
);