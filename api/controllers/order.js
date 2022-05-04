const Order = require("../models/order");
const { response } = require("express");
const fetch =require("node-fetch")



exports.testRouting = (req, res) => {
    res.send("hello routing order");
  }


  
exports.addOrder = async (req, res)=>{
    try {
        const newOrder =  new Order(req.body);
        console.log(newOrder)
        const response = await newOrder.save();
        res.send({response: response, message:"order is saved"});
    } catch (error) {
        console.log(error);
        res.status(400).send({message:"can not save order"});
    }

}

// My products in sale / if there is any command of my products
exports.getSellerOrders = async (req,res)=>{
    try {
        const sellerOrders = await Order.find().populate('buyer').populate('product')            
        const result = sellerOrders.filter(el=>  el.seller._id == req.params.id)
        res.send({response:result,message:"Getting seller orders sucessfully"});

    } catch (error) {      
    res.status(400).send({message:"can not get seller orders"})  
    }
}




// My orders passed / check the products state i want to buy
exports.getBuyerOrders = async (req,res)=>{
    try {
        const buyerorders = await Order.find().populate('seller').populate('product')      
        const result = buyerorders.filter(el=>  el.buyer._id == req.params.id)
        res.send({response:result,message:"Getting buyer orders sucessfully"});

    } catch (error) {      
    res.status(400).send({message:"can not get buyer orders"})  
    }
}




exports.updateOrder= async (req,res)=>{
    try {
        const result = await Order.updateOne(
            {_id:req.params.id},
            {$set:{...req.body}
        });
    
        result.nModified ? 
        res.status(200).send({message:"Order UPDATED"})  
        : res.status(200).send({message:"Order already UPDATED"});
        console.log(result)
    } catch (error) {
             res.status(400).send({message:"Can't UPDATE there is no order by this id"})
    }
}


exports.deleteOrder = async (req, res)=>{

    try {
        const result = await Order.deleteOne({_id:req.params.id });
        result.n
        ? res.send({response:"order deleted"}) 
        : res.send("There is no order by this id ")
        console.log(result)
    } catch (error) {
        res.status(400).send({message:"Can't DELETE there is no order by this id"})
    }

}