const rideService = require('../services/ride.service');
const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');
const { getCaptainInTheRadius } = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');


module.exports.createRide = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        pickup,
        destination,
        fullPickup,
        fullDestination,
        vehicleType
    } = req.body;
    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            fullPickup,
            fullDestination,
            vehicleType
        });
        res.status(201).json(ride);

        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);


        const captainsInRadius = await mapService.getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        console.log('captainsInRadius', captainsInRadius)

        const rideWithUser = await rideModel.findOne(ride._id).populate('user')
        rideWithUser.otp = "";


        captainsInRadius.map(async(captain) => {
            console.log('captain', captain)
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

    } catch (error) {
        console.error("Error creating ride:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.getFare = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ message: error.message });
        } else if (error.status === 400) {
            return res.status(400).json({ message: error.message });
        } else {
            console.error("Error fetching fare:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports.confirmRide = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, captain } = req.body;



    try {
        const ride = await rideService.confirmRide({ rideId, captain });

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-confirmed',
                data: {
                    ride
                } // Send proper ride ID
            });
        }

        return res.status(200).json(ride);
    } catch (error) {
        console.error("Error confirming ride:", error);
        return res.status(500).json({
            message: error || 'Failed to confirm ride'
        });
    }
};

module.exports.startRide = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.body;

    try {
        const ride = await rideService.startRide({
            rideId,
            otp,
            captain: req.captain
        });

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-started',
                data: { ride }
            });
        }

        return res.status(200).json(ride);
    } catch (error) {
        console.error("Error starting ride:", error);
        return res.status(500).json({
            message: error.message || 'Failed to start ride'
        });
    }
}

module.exports.endRide = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({
            rideId,
            captain: req.captain
        });

        console.log('rideriderideride', ride)

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-ended',
                data: { ride }
            });
        }

        return res.status(200).json(ride);
    } catch (error) {
        console.error("Error ending ride:", error);
        return res.status(500).json({
            message: error.message || 'Failed to end ride'
        });
    }
}