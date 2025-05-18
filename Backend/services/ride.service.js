const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapsService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }

    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    const baseFares = {
        auto: 30,
        car: 50,
        bike: 20
    };

    const perKmRates = {
        auto: 10,
        car: 15,
        bike: 8
    };

    const perMinuteRates = {
        auto: 2,
        car: 3,
        bike: 1.5
    };

    const fare = {
        auto: Math.round(
            baseFares.auto +
            (distanceTime.distance.value / 1000) * perKmRates.auto +
            (distanceTime.duration.value / 60) * perMinuteRates.auto
        ),
        car: Math.round(
            baseFares.car +
            (distanceTime.distance.value / 1000) * perKmRates.car +
            (distanceTime.duration.value / 60) * perMinuteRates.car
        ),
        bike: Math.round(
            baseFares.bike +
            (distanceTime.distance.value / 1000) * perKmRates.bike +
            (distanceTime.duration.value / 60) * perMinuteRates.bike
        )
    };


    return fare;
}

module.exports.getFare = getFare;

async function getOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp; // Return just the string, not an object
}
module.exports.createRide = async({
    user,
    pickup,
    fullPickup,
    fullDestination,
    destination,
    vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("User, pickup, destination and vehicleType are required");
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fullPickup,
        fullDestination,
        otp: await getOtp(4),
        fare: fare[vehicleType],
    });

    return ride;
}

module.exports.confirmRide = async({ rideId, captain }) => {
    if (!rideId) {
        throw new Error("Ride ID are required");
    }

    await rideModel.findByIdAndUpdate({ _id: rideId }, {
        status: "accepted",
        captain: captain._id
    })

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error("Ride not found");
    }

    // if (ride.otp !== otp) {
    //     throw new Error("Invalid OTP");
    // }

    return ride;
}

module.exports.startRide = async({ rideId, otp, captain }) => {
    if (!rideId) {
        throw new Error("Ride ID is required");
    }

    const ride = await rideModel.findById(rideId)
        .populate('user')
        .populate('captain')
        .select('+otp');

    if (!ride) {
        throw new Error("Ride not found");
    }

    console.log('ride', ride)

    // if (ride.status !== "accepted") {
    //     throw new Error("Ride is not accepted");
    // }

    if (ride.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    const updatedRide = await rideModel.findByIdAndUpdate(
        rideId, {
            status: "onGoing",
            captain: captain._id
        }, { new: true }
    ).populate('user').populate('captain');

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: { ride: updatedRide }
    });

    return updatedRide;
}

module.exports.endRide = async({ rideId, captain }) => {
    if (!rideId) throw new Error("Ride ID is required");

    const ride = await rideModel.findById(rideId)
        .populate('user')
        .populate('captain');

    if (!ride) throw new Error("Ride not found");
    if (ride.status !== "onGoing") throw new Error("Ride is not ongoing");

    const updatedRide = await rideModel.findByIdAndUpdate(
        rideId, { status: "completed" }, { new: true }
    ).populate('user').populate('captain');

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-ended',
        data: { ride: updatedRide }
    });

    return updatedRide;
}