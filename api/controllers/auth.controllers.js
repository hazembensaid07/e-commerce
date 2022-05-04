const User = require("../models/user");
const { sendEmailWithNodemailer } = require("../helpers/email");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const expressJwt = require('express-jwt');
const {OAuth2Client} = require('google-auth-library');
const { response } = require("express");
const fetch =require("node-fetch")


exports.testRouting = (req, res) => {
    res.send("hello routing");
  }

 // exports.signup = async (req, res) => {
//   try {
//     const newUser = new user(req.body);
//     const userVerf = await user.findOne({email:req.body.email})

//      if(userVerf){
//        res.status(400).send({message:"Email already exists"});
//        return;
//      }
  
//     const response = await newUser.save();
//     res.send({response: response, message:"user is saved"});

//   } catch (error) {
//     console.log(error);
//     res.status(400).send({message:"can not save it"});
//   }
//   }
  exports.signup = (req, res) => {
    const { name, email, password } = req.body;
   
    User.findOne({ email }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          error: "Email is taken",
        });
      }
   
      const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACCOUNT_ACTIVATION,
        { expiresIn: "10m" }
      );
   
      const emailData = {
        from: "rayene.bendhief@gmail.com", // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
        to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
        subject: "ACCOUNT ACTIVATION LINK",
        html: `
                  <h1>Please use the following link to activate your account</h1>
                  <p>http://localhost:3000/activate/${token}</p>
                  <hr />
                  <p>This email may contain sensitive information</p>
                  <p>http://localhost:3000</p>
              `,
      };

      sendEmailWithNodemailer(req, res, emailData);

    });
  };



  exports.accountActivation = (req,res) =>{
    const {token} = req.body

    if (token) {
      jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION, function(err,decoded){
          if(err){
            console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR',err)
            return res.status(401).json({
              error:"Expired link. Signup again"
            })
          }

          const {name,email,password} =jwt.decode(token)
          const user = new User({name,email,password})
          user.save((err,user)=>{
            if(err){
              console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR",err)
              return res.status(401).json({
                error:'Error saving user in database.Try signin'
              })
            }
            return res.json({
              message:'Signup succss. Please singin'
            })
          })
      })
    } else {
        return res.json({
          error:'Something went wrong. Please try again'
        }) 
    }
  };


  exports.signin = (req,res) => {
    const {email,password} = req.body
    //check if user exists in DB
    User.findOne({email}).exec((err,user) =>{
      if(err || !user) {
        return res.status(400).json({
          error: "User with that email does not exist. Please signup!"
        })
      }
      //authenticate
      if(!user.authenticate(password)){
        return res.status(400).json({
          error: "Wrong Password!"
        })
      }
      //generate token and send it to client
      const token = jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
      const {_id,name,email,role} = user
      return res.json({
        message:'Signin succss.',
        token,
        user:{_id,name,email,role},
      })
    })
  
  }



  exports.requireSignin = expressJwt({
    secret : process.env.JWT_SECRET 
    , algorithms: ['HS256'] // data in req.user
  })


  exports.adminMiddleware =(req, res, next)=>{
    User.findById({_id:req.user._id}).exec((err,user)=>{
          if(err || !user){
            return res.status(400).json({
                error: 'User not found'
            })
        }

          if(user.role !== 'admin'){
            return res.status(400).json({
              error: 'Admin resource. Access denied'
          })
          }

          req.profile= user;
          next()

    })
  }



exports.forgotPassword =(req,res)=>{
  const {email} = req.body
  User.findOne({email},(err,user)=>{
    if (err || !user){
      return res.status(400).json({
        error:'User with that email does not exist'
      })
    }
    
    

    const token = jwt.sign(
      { _id : user._id, name: user.name },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );
 
    const emailData = {
      from: "rayene.bendhief@gmail.com", // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: "PASSWORD RESET LINK",
      html: `
                <h1>Please use the following link to reset your password</h1>
                <p>http://localhost:3000/reset-password/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>http://localhost:3000</p>
            `,
    };
    user.updateOne({resetPasswordLink:token},(err,success)=>{
      if(err){
        return res.status(400).json({
          error:'DataBase connection error on user password forgo request'
        })
      } else {  
        sendEmailWithNodemailer(req, res, emailData);}
    })


  })
}



exports.resetPassword =(req,res)=>{
  const {resetPasswordLink,newPassword} = req.body

  if(resetPasswordLink){
    jwt.verify(resetPasswordLink,process.env.JWT_ACCOUNT_ACTIVATION,function(err,decoded){
      if(err){
        return res.status(400).json({
          error:'Expired link. Try again'
        })
      }
      User.findOne({resetPasswordLink}, (err,user)=>{
        if(err || !user){
          return res.status(400).json({
            error:'Something went wroing. Try later'
          })
        }
        const updatedFields = {
          password: newPassword,
          resetPasswordLink:''
        }

        user = _.extend(user, updatedFields)
        user.save((err,result)=>{
          if(err){
            return res.status(400).json({
              error:'Error reseting user password'
            })
          }
          res.json({
            message:`Great! you can now login with your new password.`
          })
        })
      })

    })
  }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
exports.googleLogin=(req,res)=>{
  const {idToken} = req.body
  client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT_ID}).then(response=>{
    console.log("google auth response:",response)
    const {email_verified,name,email} = response.payload
    if(email_verified){
      User.findOne({email}).exec((err,user)=>{
        if(user){
          const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:'7d'})
          const {_id,email,name,role}=user
          return res.json({
            token, user : {_id,email,name,role}
          })
        } else{
          let password = email + process.env.JWT_SECRET
          user = new User({name,email,password})
          user.save((err,data)=>{
            if(err){
              console.log("ERROR google login on user save",err)
              return res.status(400).json({
                error:'User signup failer with google'
              })
            }
            const token = jwt.sign({_id:data._id}, process.env.JWT_SECRET,{expiresIn:'7d'})
            const {_id,email,name,role}=data
            return res.json({
              token, user : {_id,email,name,role}
            })
          })
        }
      })
    } else{
        return res.status(400).json({
          error:'Google login failed try again'
        })      
    }
  })
}


exports.facebookLogin=(req,res)=>{
  const {userID, accessToken} = req.body

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&acess_token=${accessToken}`
  return(
    fetch(url,{
      method:'GET'
    })
    .then(response=>response.json())
    .then(response=>{
      const {email,name} = response
      User.findOne({email}).exec((err,user)=>{
        if(user){
          const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:'7d'})
          const {_id,email,name,role}=user
          return res.json({
            token, user : {_id,email,name,role}
          })
        } else{
          let password = email + process.env.JWT_SECRET
          user = new User({name,email,password})
          user.save((err,data)=>{
            if(err){
              console.log("ERROR facebook login on user save",err)
              return res.status(400).json({
                error:'User signup failer with facebook'
              })
            }
            const token = jwt.sign({_id:data._id}, process.env.JWT_SECRET,{expiresIn:'7d'})
            const {_id,email,name,role}=data
            return res.json({
              token, user : {_id,email,name,role}
            })
          })
        }

        
      })
    })
    .catch(error=>{
      res.json({
        error: 'Failed login with facebook. Try later'
      })
    })
  )
}