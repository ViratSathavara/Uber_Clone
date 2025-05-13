const captionModel = require('../models/caption.model');
const captionService = require('../services/caption.service')
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaption = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptionAlreadyExist = await captionModel.findOne({ email });

    if (isCaptionAlreadyExist) {
        return res.status(400).json({ error: 'Caption already exists' });
    }

    const hashPassword = await captionModel.hashPassword(password);


    const captain = await captionService.createCaption({
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

module.exports.loginCaption = async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captionModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({
            success: false,
            status: '401',
            message: 'Invalid email address',
        });
    }

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
        message: 'Caption logged in successfully',
        data: {
            captain,
            token,
        },
    });
}

module.exports.getCaptionProfile = async(req, res, next) => {
    res.status(200).json(req.captain);
}

module.exports.logoutcaption = async(req, res, next) => {
    res.clearCookie('token');

    // const token = req.cookies.token || req.headers['authorization'] ? .split(' ')[1];

    await blacklistTokenModel.create({
        token,
    });

    res.status(200).json({
        success: true,
        status: '200',
        message: 'Caption logged out successfully',
    });
}