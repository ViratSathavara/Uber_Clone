const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    console.log(pickup, destination)
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

    console.log(fare)

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
        otp: await getOtp(4),
        fare: fare[vehicleType],
    });

    return ride;
}