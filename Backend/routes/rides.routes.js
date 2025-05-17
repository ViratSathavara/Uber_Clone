const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isLength({ min: 1 }).withMessage('Pickup location is required'),
    body('destination').isLength({ min: 1 }).withMessage('Destination location is required'),
    body('vehicleType').isIn(['auto', 'car', 'bike']).withMessage('Invalid vehicle type'),
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

module.exports = router