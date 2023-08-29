const mongoose = require('mongoose');

const airQualitySchema = mongoose.Schema({
    country: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    qualityScore: {
        type: Number
    },
    measuredAt: {
        type: Date,
        default: Date.now()
    }
});

airQualitySchema.pre('save', async function (next) {
    console.log('Saving Air Quality for Paris Zone ... '+ Date.now())
    next()
})

airQualitySchema.statics.findHighQualityScore = function () {
    const airQuality = this.findOne({})
        .sort({"qualityScore":-1})
        .limit(1)
        .exec();

    if (!airQuality) {
        throw new Error("Unable to get the quality score")
    }

    return airQuality;
}


const AirQuality = mongoose.model('airQuality', airQualitySchema);

module.exports = AirQuality;