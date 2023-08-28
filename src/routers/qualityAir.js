const express = require('express');
const axios = require('axios');
const router = express.Router();

const axiosOptions = {
    headers: {
        "Content-Type": "application/json"
    }
}

//GET /quality_air/infos?lat=:latitude&lon=:longitude

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
            console.log(error);
            return res.status(400).send({ error: 'An error has occurred. Please retry later.' })
        }

    }
})

module.exports = router
