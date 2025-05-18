const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service')
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ error: 'Captain already exists' });
    }

    const hashPassword = await captainModel.hashPassword(password);


    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });

}

module.exports.loginCaptain = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');


    // if (!captain) {
    //     return res.status(401).json({
    //         success: false,
    //         status: '401',
    //         message: 'Invalid email address',
    //     });
    // }


    const isMatch = await captain.comparePassword(password, captain.password);

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            status: '401',
            message: 'Password is incorrect',
        });
    }

    const token = await captain.generateAuthToken();


    res.cookie('token', token);

    res.status(200).json({
        success: true,
        status: '200',
        message: 'Captain logged in successfully',
        data: {
            captain,
            token,
        },
    });
}

module.exports.getCaptainProfile = async(req, res, next) => {
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async(req, res, next) => {
    res.clearCookie('token');

    // const token = req.cookies.token || req.headers['authorization'] ? .split(' ')[1];

    await blacklistTokenModel.create({
        token,
    });

    res.status(200).json({
        success: true,
        status: '200',
        message: 'Captain logged out successfully',
    });
}