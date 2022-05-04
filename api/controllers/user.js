const User = require("../models/Nuser");

// exports.testRouting = (req, res) => {
//     res.send("hello routing");
//   }

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
      const {first_name,last_name,location,phone,profile_description,birth_date,password} = req.body
      User.findOne({_id:req.user._id}, (err,user)=>{
          if(err || !user){
              return res.status(400).json({
                  error: 'User not found'
              })
          }
          if(!first_name){
            return res.status(400).json({
                error: 'First Name is required'
            })
          }
          else{
              user.first_name = first_name
          }

          if(!last_name){
            return res.status(400).json({
                error: 'Last Name is required'
            })
          }
          else{
              user.last_name = last_name
          }
          if(!phone){
            return res.status(400).json({
                error: 'Phone is required'
            })
          }
          else{
              user.phone = phone
          }
          if(!location){
            return res.status(400).json({
                error: 'Location is required'
            })
          }
          else{
              user.location = location
          }
          if(!birth_date){
            return res.status(400).json({
                error: 'Birth date is required'
            })
          }
          else{
              user.birth_date = birth_date
          }
          if(!profile_description){
            return res.status(400).json({
                error: 'Profile description is required'
            })
          }
          else{
              user.profile_description = profile_description
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
    const username = req.params.username
    User.findOne({ username }, (err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User not found'
            })
        }

        res.json(user);
    })
}





