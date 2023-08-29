const AirQuality = require('../models/airQuality');

const saveAirQuality = async (latitude, longitude, country, qualityScore) => {
    const airQuality = new AirQuality({
        latitude,
        longitude,
        country,
        qualityScore,
        measuredAt: Date.now()
    });
    try {
        await airQuality.save();
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = {
    saveAirQuality
}