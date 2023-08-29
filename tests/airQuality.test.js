const express = require('express');
const request = require('supertest');
const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios');
const airQualityRouter = require('../src/routers/airQuality');

const app = express();
app.use('/airquality', airQualityRouter);


const PARIS_LATITUDE = '48.856613';
const PARIS_LONGITUDE = '2.352222';
describe('Unit tests for the endpoint /airquality/infos', () => {
    it('Should return correct information from the external API of IQAIR', async () => {
        // Mock of the external API with Nock
        const expectedData = {
            // Data expected from the external API
            "status": "success",
            "data": {
                "city": "Dakar",
                "state": "Dakar",
                "country": "Senegal",
                "location": {
                    "type": "Point",
                    "coordinates": [
                        -17.44406,
                        14.6937
                    ]
                },
                "current": {
                    "pollution": {
                        "ts": "2023-08-29T00:00:00.000Z",
                        "aqius": 64,
                        "mainus": "p2",
                        "aqicn": 26,
                        "maincn": "p2"
                    },
                    "weather": {
                        "ts": "2023-08-29T01:00:00.000Z",
                        "tp": 27,
                        "pr": 1011,
                        "hu": 82,
                        "ws": 3.79,
                        "wd": 264,
                        "ic": "10n"
                    }
                }
            }
        };

        nock(process.env.IQAIR_BASE_URL)
            .get("/nearest_city")
            .query(true) // Check params of the request
            .reply(200, expectedData);

        const response = await request(app)
            .get('/airquality/infos')
            .query({ lat: PARIS_LATITUDE, lon: PARIS_LONGITUDE });

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(expectedData);
    });

    it('Should return an error if no parameters in the request', async () => {
        const response = await request(app)
            .get('/airquality/infos');

        expect(response.status).to.equal(400);
        expect(response.body).to.deep
            .equal({ error: 'Invalid params! Params are lat(for latitude) and lon(for longitude).' });
    });

    it('Should return an error if there is an error from the external API', async () => {
        nock(process.env.IQAIR_BASE_URL)
            .get('/nearest_city')
            .query(true)
            .reply(500); //force statusCode 500

        const response = await request(app)
            .get('/airquality/infos')
            .query({ lat: PARIS_LATITUDE, lon: PARIS_LONGITUDE });

        expect(response.status).to.equal(400);
        expect(response.body).to.deep
            .equal({ error: 'An error has occurred. Please try again later.' });
    });
});