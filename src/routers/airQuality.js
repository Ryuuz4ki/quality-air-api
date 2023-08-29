const express = require('express');
const axios = require('axios');
const router = express.Router();
const AirQuality = require('../models/airQuality');

const axiosOptions = {
    headers: {
        "Content-Type": "application/json"
    }
}

//GET /airquality/infos?lat=:latitude&lon=:longitude

/**
 * @swagger
 * /airquality/infos?lat={latitude}&lon={longitude} :
 *   get:
 *     summary: Make a GET call to this endpoint to retrieve infos about Air Quality of a location.
 *     description: Make a GET call to this endpoint to retrieve infos about Air Quality of a location just putting the latitude and longitude.
 *
 *     parameters:
 *       - in: path
 *         name: latitude
 *         schema:
 *           type: string
 *         required: true
 *         description: The latitude of the location
 *       - in: path
 *         name: longitude
 *         schema:
 *           type: string
 *         required: true
 *         description: The longitude of the location
 *
 *     responses:
 *       200:
 *         description: Display informations about quality of the air in the location.
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 city: Dakar
 *                 state: Dakar
 *                 country: Senegal
 *                 location:
 *                   type: Point
 *                   coordinates:
 *                     - 14.6937, -17.44406
 *                 current:
 *                   pollution:
 *                     ts: "2023-08-29T00:00:00.000Z"
 *                     aqius: 64
 *                     mainus: p2
 *                     aqicn: 26
 *                     maincn: p2
 *                   weather:
 *                     ts: "2023-08-29T00:00:00.000Z"
 *                     tp: 27
 *                     pr: 1011
 *                     hu: 82
 *                     ws: 3.79
 *                     wd: 264
 *                     ic: "10n"
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: An error has occured.
 *
 *
 */

router.get("/infos", async(req, res) => {
    let axiosUrl = process.env.IQAIR_BASE_URL;

    if (!req.query.lat || !req.query.lon) {
        return res.status(400).send({ error: 'Invalid params! Params are lat(for latitude) and lon(for longitude).' })
    }
    else {
        axiosUrl += "/nearest_city?lat=" + req.query.lat + "&lon=" + req.query.lon + "&key=" + process.env.IQAIR_API_KEY;
        axiosOptions.headers.baseURL = axiosUrl ;

        try {
            await axios.get(axiosUrl, axiosOptions)
                .then((resp) => {
                    res.status(200).send(resp.data);
                })
        }
        catch (error) {
            console.log('Error from IQAIR API:', error.code, error.response.status);
            return res.status(400).send({ error: 'An error has occurred. Please try again later.' })
        }

    }
})


//GET /airquality/paris/mostPollutedDate

/**
 * @swagger
 * /airquality/paris/mostPollutedDate :
 *   get:
 *     summary: Make a GET call to this endpoint to retrieve the most polluted datetime in Paris zone.
 *     description: Make a GET call to this endpoint to retrieve the most polluted datetime in Paris zone.
 *
 *
 *     responses:
 *       200:
 *         description: Display message about the most polluted datetime in Paris zone.
 *         content:
 *           application/json:
 *             example:
 *               message: "The most polluted date at Paris is Tue Aug 29 2023 00:53:00 GMT+0000 (Greenwich Mean Time)"
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: An error has occured.
 *
 *
 */

router.get("/paris/mostPollutedDate", async(req, res) => {
    try {
        const airQuality = await AirQuality.findHighQualityScore();
        res.status(200).send({ message: "The most polluted date at Paris is " + airQuality.measuredAt });
    }
    catch (e) {
        res.status(400).send({ error: 'An error has occurred. Please try again later.' });
    }
})

module.exports = router
