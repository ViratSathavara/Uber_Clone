const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinates = async(address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng,
            };
        } else {
            throw new Error("Unable to get coordinates");
        }
    } catch (error) {
        console.error("Error fetching address coordinates:", error.message);
        throw error;
    }
};

module.exports.getDistanceTime = async(origin, destination) => {
    if (!origin || !destination) {
        throw {
            status: 400,
            message: "Origin and destination are required"
        };
    }
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            if (response.data.rows[0].elements[0].status !== "OK") {
                throw {
                    status: 404,
                    message: "Could not calculate route between these locations",
                    details: response.data.rows[0].elements[0].status
                };
            }
            return response.data.rows[0].elements[0];
        } else {
            throw {
                status: 502,
                message: "Google Maps API error",
                details: response.data.status
            };
        }
    } catch (error) {
        console.error("Error fetching distance and duration:", error.message);
        throw error;
    }
}

module.exports.getAddressSuggestions = async(input) => {
    // if (input.length === 0) {
    //     throw new Error("Input is required");
    // }

    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            return response.data.predictions;
        } else {
            throw new Error("Unable to get address suggestions");
        }
    } catch (error) {
        console.error("Error fetching address suggestions:", error.message);
        throw error;
    }
}

module.exports.getCaptainInTheRadius = async(ltd, lng, radius) => {

    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [ltd, lng], radius / 6371
                    ]
                }
            }
        });

        return captains;
    } catch (error) {
        console.error("Error fetching captains in the radius:", error.message);
        throw error;
    }

}