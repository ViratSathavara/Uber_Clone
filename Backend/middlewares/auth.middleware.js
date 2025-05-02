const blacklistTokenModel = require('../models/blacklistToken.model');
const captionModel = require('../models/caption.model');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

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

module.exports.authCaption = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

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
        console.log(decoded)
        const caption = await captionModel.findById(decoded.id);

        if (!caption) {
            return res.status(401).json({
                success: false,
                status: '401',
                message: 'Unauthorized',
            });
        }

        req.caption = caption;
        return next();

    } catch (error) {
        
        return res.status(401).json({
            success: false,
            status: '401',
            message: 'Unauthorized 1',
        });

    }

}