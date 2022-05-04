const express = require("express");
const router = express.Router();
const controllers=require("../controllers/product")
const {requireSignin,adminMiddleware}=require("../controllers/auth")
const multer = require('multer');


//MUlter config
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./client/public/uploads/ProductsImages')
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname )
    }
})
const upload = multer({storage:storage})

//import validators

// test routing
// router.get("/hello", controllers.testRouting);


// @Get post
// @desc add new product
// @path : http://localhost:5000/api/product/add
// Params 
router.post("/add",upload.single('imgSrc'),controllers.addProduct);

// @Get get
// @desc get all products
// @path : http://localhost:5000/api/product/products
// Params 
router.get("/products",controllers.getProducts);

// @Get get
// @desc get products by categorey
// @path : http://localhost:5000/api/product/productsCategorey
// Params 
router.get("/productsCategorey",controllers.getProductsByCategory);

// @Get method
// @desc get user Posts by username
// @path : http://localhost:5000/api/user/:username
// Params :id
router.get("/get/userPosts/:username",controllers.userPosts);

// @Get method
// @desc get user by id
// @path : http://localhost:5000/api/user/:id
// Params :id
// router.get("/:id",requireSignin,controllers.read);

// @Put method
// @desc update user 
// @path : http://localhost:5000/api/user/update
// Params 
router.put("/update/:id",controllers.updateProduct);



// @Get get product by id 
// @desc get one product by id
// @path : http://localhost:5000/api/product/
// Params 
router.get("/:id",controllers.product);


// @Get delete product
// @desc delete product by id 
// @path : http://localhost:5000/api/product/delete/:id
// Params 
router.delete("/delete/:id",controllers.deleteProduct);




module.exports = router;
