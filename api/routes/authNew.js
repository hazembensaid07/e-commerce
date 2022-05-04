const express = require("express");
const router = express.Router();
const controllers=require("../controllers/auth")
const multer = require('multer');

//MUlter config
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./client/public/uploads/')
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({storage:storage})

//import validators
const {signupVlidator,userSigninVlidator, forgotPasswordVlidator,resetPasswordVlidator}= require("../validators/auth")
const {runValidation}= require("../validators")

//test routing
router.get("/hello", controllers.testRouting);


// @Post method
// @desc post a user
// @path : http://localhost:5000/api/authNew/
// Params Body
router.post("/signup",upload.single('imgSrc'),signupVlidator,runValidation,controllers.signup);

// @Post method
// @desc handle account activation
// @path : http://localhost:5000/api/auth/
// Params Body
router.post("/accountActivation", controllers.accountActivation);


// @Post method
// @desc post a user
// @path : http://localhost:5000/api/auth/
// Params Body
router.post("/signin",userSigninVlidator,runValidation, controllers.signin);



// @Put method
// @desc forgot password
// @path : http://localhost:5000/api/auth/
// Params Body
router.put("/forgot-password",forgotPasswordVlidator,runValidation ,controllers.forgotPassword);


// @Put method
// @desc forgot password
// @path : http://localhost:5000/api/auth/
// Params Body
router.put("/reset-password",resetPasswordVlidator,runValidation ,controllers.resetPassword);


// @Put method
// @desc Facebook login
// @path : http://localhost:5000/api/google-login/
// Params Body
router.post("/google-login" ,controllers.googleLogin);
// @Put method
// @desc Facebook login
// @path : http://localhost:5000/api/google-login/
// Params Body
router.post("/facebook-login" ,controllers.facebookLogin);



// @Post method
// @desc post a contact
// @path : http://localhost:5000/api/contact/
// Params Body

module.exports = router;
