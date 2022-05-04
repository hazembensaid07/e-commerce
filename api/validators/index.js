const {validationResult} = require('express-validator')

//next is a func will be apllied as a middleware in the route to valid before excuting the controller

exports.runValidation = (req, res, next) =>{

    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }
    next();
};