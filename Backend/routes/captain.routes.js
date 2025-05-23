const express = require('express');
const captainController = require('../controllers/captain.controller');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('mobile').isMobilePhone('any').withMessage('Please enter a valid mobile number'),
    body('mobile').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits long'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capatioy must be at least 1 sheet'),
    body('vehicle.vehicleType')
    .customSanitizer(value => value.toLowerCase())
    .isIn(['UberGo', 'auto', 'bike', 'UberXL'], )
    .withMessage('Vehicle type must be one of the following: UberGo, auto, bike, UberXL'),

], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;