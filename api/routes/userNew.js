const express = require("express");
const router = express.Router();
const controllers=require("../controllers/user")
const {requireSignin,adminMiddleware}=require("../controllers/auth")

//import validators

//test routing
// router.get("/hello", controllers.testRouting);



// @Get method
// @desc get user by id
// @path : http://localhost:5000/api/user/:id
// Params :id
router.get("/:id",requireSignin,controllers.read);

// @Put method
// @desc update user 
// @path : http://localhost:5000/api/user/update
// Params 
router.put("/update",requireSignin,controllers.update);

// @Get method
// @desc get user by username
// @path : http://localhost:5000/api/user/:username
// Params :id
router.get("/profile/:username",controllers.loadUserProfile);

// // @Put method
// // @desc update user 
// // @path : http://localhost:5000/api/user/update
// // Params 
// router.put("/update",requireSignin,controllers.update);




module.exports = router;
