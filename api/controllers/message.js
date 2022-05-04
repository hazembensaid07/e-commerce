const Message = require("../models/message");
const { response } = require("express");
const fetch =require("node-fetch")



exports.testRouting = (req, res) => {
    res.send("hello routing message");
  }


exports.addMessage = async (req, res)=>{
    try {
        const newMessage =  new Message(req.body);
        console.log(newMessage)
        const response = await newMessage.save();
        res.send({response: response, message:"Message is saved"});
    } catch (error) {
        console.log(error);
        res.status(400).send({message:"can not save Message"});
    }

}


exports.getMessages = async (req,res)=>{
    try {
        const result = await Message.find().populate('user')
        res.send({response:result,message:"Getting Messages sucessfully"});
        
    } catch (error) {
    
        res.status(400).send({message:"can not get Messages"})
    }

}