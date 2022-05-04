const User = require("../models/user");

exports.testRouting = (req, res) => {
    res.send("hello routing");
  }

exports.read = (req, res) => {
    const userId = req.params.id
    User.findById(userId).exec((err,user)=> {
        if(err || !user){
            return res.status(400).json({
                error : 'User not found'
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    })
  }


  exports.update = (req,res) =>{
      const {name,password} = req.body
      User.findOne({_id:req.user._id}, (err,user)=>{
          if(err || !user){
              return res.status(400).json({
                  error: 'User not found'
              })
          }
          if(!name){
            return res.status(400).json({
                error: 'Name is required'
            })
          }
          else{
              user.name = name
          }
        
          if(password){
              if(password.length <6){
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                })
              }
              else{
                  user.password = password
              }
          }
        
        user.save((err,updatedUser)=>{
            if(err){
                console.log("User update ERROR",err)
                return res.status(400).json({
                    error: 'User Updated Fail'
                })
            }
            updatedUser.hadhed_password = undefined
            updatedUser.salt = undefined
            res.json(updatedUser)
        })
      })

  }



exports.loadUserProfile=(req,res)=>{
    const name = req.params.name
    User.findOne({ name }, (err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User not found'
            })
        }

        res.json(user);
    })
}