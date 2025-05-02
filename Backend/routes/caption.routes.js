const express = require('express');
const captionController = require('../controllers/caption.controller');
const router = express.Router();
const { body } = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Vehicle capatioy must be at least 1 sheet'),
    body('vehicle.vehicleType').isIn(['car', 'auto', 'bike']).withMessage('Vehicle type must be one of the following: car, auto, bike'),  
], captionController.registerCaption);

module.exports = router;