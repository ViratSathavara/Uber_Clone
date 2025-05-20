const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isLength({ min: 1 }).withMessage('Pickup location is required'),
    body('destination').isLength({ min: 1 }).withMessage('Destination location is required'),
    body('vehicleType').isIn(['UberGo', 'auto', 'bike', 'UberXL'], ).withMessage('Invalid vehicle type'),
    rideController.createRide,

    (req, res) => {

        // Logic to create a ride
        res.status(201).json({ message: 'Ride created successfully' });
    });

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isLength({ min: 1 }).withMessage('Pickup location is required'),
    query('destination').isLength({ min: 1 }).withMessage('Destination location is required'),
    rideController.getFare,
)

router.post('/confirm-ride',
    authMiddleware.authCaptain,
    body('rideId').isLength({ min: 1 }).withMessage('Ride ID is required'),
    // body('otp').isLength({ min: 4, max: 4 }).withMessage('Invalid OTP'),
    rideController.confirmRide,
)

router.post('/start-ride',
    authMiddleware.authCaptain,
    body('rideId').isLength({ min: 1 }).withMessage('Ride ID is required'),
    body('otp').isLength({ min: 4, max: 4 }).withMessage('Invalid OTP'),
    rideController.startRide
);

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isLength({ min: 1 }).withMessage('Ride ID is required'),
    rideController.endRide
);

module.exports = router