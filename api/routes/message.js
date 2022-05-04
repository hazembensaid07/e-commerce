const express = require("express");
const router = express.Router();
const controllers=require("../controllers/message")



router.get("/hello", controllers.testRouting);

// @Post messages
// @desc add new message to global chat
// @path : http://localhost:5000/api/message/add
// Params 
router.post("/add",controllers.addMessage);

// @Get messages
// @desc Get all messages
// @path : http://localhost:5000/api/message/get
// Params 
router.get("/getAll",controllers.getMessages);

module.exports = router;