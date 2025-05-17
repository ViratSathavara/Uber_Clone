const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/maps.controller');
const { query } = require('express-validator');

router.get('/get-coordinate',
    query('address').isLength({ min: 3 }).withMessage('Minimum 3 characters'),
    authMiddleware.authUser,
    mapController.getCoordinates // Make sure this function exists in your controller
);

router.get('/get-distance-time',
    query('origin').isLength({ min: 1 }).withMessage('Minimum 1 characters'),
    query('destination').isLength({ min: 1 }).withMessage('Minimum 1 characters'),
    authMiddleware.authUser,
    mapController.getDistanceTime
);

router.get('/get-suggestions',
    query('input').isLength({ min: 1 }).withMessage('Minimum 1 characters'),
    authMiddleware.authUser,
    mapController.getSuggestion
);

module.exports = router;