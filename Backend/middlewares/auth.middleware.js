const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            status: '401',
            message: 'Unauthorized',
        });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });

    if (isBlacklisted) {
        return res.status(401).json({
            success: false,
            status: '401',
            message: 'Unauthorized',
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                status: '401',
                message: 'Unauthorized',
            });
        }

        req.user = user;
        return next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            status: '401',
            message: 'Unauthorized',
        });

    }

}

module.exports.authCaptain = async(req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            status: '401',
            message: 'Token not available',
        });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });


    if (isBlacklisted) {
        return res.status(401).json({
            success: false,
            status: '401',
            message: 'Unauthorized 2',
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded.id);

        if (!captain) {
            return res.status(401).json({
                success: false,
                status: '401',
                message: 'Unauthorized',
            });
        }

        req.captain = captain;
        return next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            status: '401',
            message: 'Unauthorized 1',
        });

    }

}