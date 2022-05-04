const Product = require("../models/product");
const { response } = require("express");
const fetch =require("node-fetch")
const User = require("../models/Nuser");


// exports.testRouting = (req, res) => {
//     res.send("hello routing");
//   }


  
exports.addProduct = async (req, res)=>{
    const imgSrc = req.file.path;
    const { name,price,size,brand,type,shipping,postedBy } = req.body;
    try {
        const newProduct =  new Product({name,price,imgSrc,size,brand,type,shipping,postedBy});
        console.log(newProduct)
        const response = await newProduct.save();
        res.send({response: response, message:"product is saved"});
    } catch (error) {
        console.log(error);
        res.status(400).send({message:"can not save it"});
    }

}




exports.getProducts = async (req, res)=>{

    try {
        const result = await Product.find({active:true}).populate('postedBy')
        res.send({response:result,message:"Getting data sucessfully"});
        
    } catch (error) {
    
        res.status(400).send({message:"can not get products"})
    }

}

exports.userPosts = async (req, res)=>{
 
    try {
        const resa = await Product.find().populate('postedBy')
        
        const result = resa.filter(el=>  el.postedBy.username == req.params.username)
        res.send({response:result,message:"Getting data sucessfully"});
        
    } catch (error) {
    
        res.status(400).send({message:"can not get posts"})
    }

}

exports.updateProduct= async (req,res)=>{
    try {
        const result = await Product.updateOne(
            {_id:req.params.id},
            {$set:{...req.body}
        });
    
        result.nModified ? 
        res.status(200).send({message:"Product UPDATED"})  
        : res.status(200).send({message:"Product already UPDATED"});
        console.log(result)
    } catch (error) {
             res.status(400).send({message:"Can't UPDATE there is no prodcut by this id"})
    }
}

exports.product = async (req, res)=>{

    try {
        const result = await Product.findById(req.params.id).populate('postedBy')
        res.send({response:result,message:"Getting porduct sucessfully"});
        
    } catch (error) {
    
        res.status(400).send({message:"can not get product"})
    }

}

exports.deleteProduct = async (req, res)=>{

    try {
        const result = await Product.deleteOne({_id:req.params.id });
        result.n
        ? res.send({response:"Porduct deleted"}) 
        : res.send("There is not product by this id ")
        console.log(result)
    } catch (error) {
        res.status(400).send({message:"Can't DELETE there is no product by this id"})
    }

}



exports.getProductsByCategory = async (req, res) => {
  const PAGE_SIZE = 6;
  const page = parseInt(req.query.page || "0");
  const total = await Product.countDocuments({});
  const query = {};
  if (req.query.search) {
    query.name = {
      $regex: req.query.search,
      $options: "i",
    };
  }
  query.active = true;
  try {
    const result = await Product.find(query).populate('postedBy')
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    if (result.length === 0) {
      res.status(406).send({ msg: "there is no this category" });
    } else {
      res.send({
        message: "Producs found",
        result,
        totalPages: Math.ceil(total / PAGE_SIZE),
      });
    }
  } catch (error) {
    res.status(402).send({ message: "There is no products with this category" });
  }
};