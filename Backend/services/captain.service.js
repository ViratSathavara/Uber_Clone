const captainModel = require('../models/captain.model');

module.exports.createCaptain = async({
    firstname,
    lastname,
    mobile,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType
}) => {

    if (!firstname || !lastname || !mobile || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        mobile,
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;

}