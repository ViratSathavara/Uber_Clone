const mapsService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    // if (!address) {
    //     return res.status(400).json({ message: "Address is required" });
    // }

    try {
        const coordinates = await mapsService.getAddressCoordinates(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        console.error("Error fetching address coordinates:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.getDistanceTime = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    // if (!origin || !destination) {
    //     return res.status(400).json({ message: "Origin and destination are required" });
    // }

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;
        const distance = await mapsService.getDistanceTime(origin, destination);
        return res.status(200).json(distance);
    } catch (error) {
        console.error("Error fetching distance and duration:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.getSuggestion = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;
    // if (!address) {
    //     return res.status(400).json({ message: "Address is required" });
    // }

    try {
        const suggestions = await mapsService.getAddressSuggestions(input);
        return res.status(200).json(suggestions);
    } catch (error) {
        console.error("Error fetching address suggestions:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}