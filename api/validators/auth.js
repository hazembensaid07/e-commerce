const {check} =require('express-validator')


exports.userSignupVlidator =[
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Must be a valid email'),
    check('password').isLength({min :6}).withMessage('Password must be at least 6 characters long'),

]

exports.userSigninVlidator =[
    check('email').isEmail().withMessage('Email is not Valid'),
    check('password').isLength({min :6}).withMessage('Password must be at least 6 characters long'),

]


exports.forgotPasswordVlidator =[
    check('email').not().isEmpty().isEmail().withMessage('Email is not valid'),
]

exports.resetPasswordVlidator =[
    check('newPassword').not().isEmpty().isLength({min :6}).withMessage('Password must be at least 6 characters long'),
]


//New validators-------------------
exports.signupVlidator =[
    check('username').not().isEmpty().withMessage('Username is required'),
    check('first_name').not().isEmpty().withMessage('First Name is required'),
    check('last_name').not().isEmpty().withMessage('Last Name is required'),
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').isLength({min :6}).withMessage('Password must be at least 6 characters long'),

]