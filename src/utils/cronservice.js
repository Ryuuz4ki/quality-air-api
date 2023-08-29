//const express = require('express');
const axios = require('axios');
const cron = require('cron');
const airQualityRepository = require('../repository/airQuality.repository');
require('../db/mongoose');

const axiosOptions = {
    headers: {
        "Content-Type": "application/json"
    }
}

const PARIS_LATITUDE = '48.856613';
const PARIS_LONGITUDE = '2.352222';
const axiosURL = process.env.IQAIR_BASE_URL + "/nearest_city?lat=" + PARIS_LATITUDE + "&lon=" + PARIS_LONGITUDE + "&key=" + process.env.IQAIR_API_KEY;

let country = '';
let qualityScore = 0;
var CronJob = cron.CronJob;
var task = new CronJob(
    '* * * * *',
    async () => {
        try {
            await axios.get(axiosURL, axiosOptions)
                .then(async (resp) => {
                    const dataFromAPI = resp.data;
                    if (dataFromAPI.status === 'success') {
                        country = dataFromAPI.data.country + ' - ' + dataFromAPI.data.city;
                        qualityScore = dataFromAPI.data.current.pollution['aqius'];
                        await airQualityRepository.saveAirQuality(PARIS_LATITUDE, PARIS_LONGITUDE, country, qualityScore);
                    }
                    else {
                        console.log('An error has occured while getting Air Quality Infos from API.')
                    }
                });

        } catch (error) {
            console.error('An error has occured :', error.message);
        }
    },
    null,
    true,
    'Africa/Dakar'
);

//task.start();
