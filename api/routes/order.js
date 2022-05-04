const express = require("express");
const router = express.Router();
const controllers=require("../controllers/order")
const {requireSignin,adminMiddleware}=require("../controllers/auth")




//import validators

// test routing
router.get("/hello", controllers.testRouting);


// @Post orders
// @desc add new order
// @path : http://localhost:5000/api/order/add
// Params 
router.post("/add",controllers.addOrder);




// @Get seller orders
// @desc  get seller orders
// @path : http://localhost:5000/api/seller/:id
// Params 
router.get("/seller/:id",controllers.getSellerOrders);


// @Get  buyer orders
// @desc  buyer orders
// @path : http://localhost:5000/api/buyer/:id
// Params 
router.get("/buyer/:id",controllers.getBuyerOrders);


// @Put order
// @desc  update order info by id
// @path : http://localhost:5000/api/buyer/:id
// Params 
router.put("/update/:id",controllers.updateOrder);


// @Delete ordere
// @desc  delete order by id
// @path : http://localhost:5000/api/buyer/:id
// Params 
router.delete("/delete/:id",controllers.deleteOrder);



// @Get method
// @desc get user Posts by username
// @path : http://localhost:5000/api/user/:username
// Params :id
// router.get("/get/userPosts/:username",controllers.userPosts);

// @Get method
// @desc get user by id
// @path : http://localhost:5000/api/user/:id
// Params :id
// router.get("/:id",requireSignin,controllers.read);

// @Put method
// @desc update user 
// @path : http://localhost:5000/api/user/update
// Params 
// router.put("/update/:id",controllers.updateProduct);



// @Get get product by id 
// @desc get one product by id
// @path : http://localhost:5000/api/product/
// Params 
// router.get("/:id",controllers.product);


// @Get delete product
// @desc delete product by id 
// @path : http://localhost:5000/api/product/delete/:id
// Params 
// router.delete("/delete/:id",controllers.deleteProduct);




module.exports = router;
