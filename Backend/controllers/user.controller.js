const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const userServices = require('../services/user.servies');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser = async(req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { fullname, mobile, email, password } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    const isCaptainAlreadyExistByPhone = await captainModel.findOne({ mobile });
    const isUserAlreadyExist = await userModel.findOne({ email });
    const isUserAlreadyExistByPhone = await userModel.findOne({ mobile });

    if (isCaptainAlreadyExist || isCaptainAlreadyExistByPhone) {
        return res.status(400).json({ error: 'Captain already exists' });
    }
    if (isUserAlreadyExist || isUserAlreadyExistByPhone) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userServices.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        mobile,
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

module.exports.loginUser = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({
            success: false,
            status: '401',
            message: 'Invalid email address',
        });
    }

    const isMatch = await user.comparePassword(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            status: '401',
            message: 'Password is incorrect',
        });
    }

    const token = await user.generateAuthToken();


    res.cookie('token', token);

    res.status(200).json({
        success: true,
        status: '200',
        message: 'User logged in successfully',
        data: {
            user,
            token,
        },
    });

}

module.exports.getUserProfile = async(req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async(req, res, next) => {
    res.clearCookie('token');

    // const token = req.cookies.token || req.headers['authorization'] ?.split(' ')[1];

    await blacklistTokenModel.create({
        token,
    });

    res.status(200).json({
        success: true,
        status: '200',
        message: 'User logged out successfully',
    });
}