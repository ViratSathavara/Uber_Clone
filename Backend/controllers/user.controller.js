const userModel = require('../models/user.model');
const userServices = require('../services/user.servies');
const { validationResult } = require('express-validator');


module.exports.registerUser = async (req, res, next) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userServices.createuser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
    });

    const token = await user.generateAuthToken();

    res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: {
            user, 
            token,
        },
    });
}