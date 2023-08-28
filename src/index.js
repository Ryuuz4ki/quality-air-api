const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const qualityAirRouter = require('./routers/qualityAir');


const PORT = process.env.PORT || 3030 ;
const HOME_URL = process.env.HOME_URL || "http://localhost:3030/" ;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "QUALITY AIR API",
            description: "A REST API responsible for exposing the air quality information.",
            version: '1.0.0',
        },
        servers: [
            {
                url: HOME_URL,
            }
        ],
    },
    apis: ['./src/routers/*.js'], // files containing annotations as above
};

const specs = swaggerJsDoc(options);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'))


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {
    customCssUrl : '../public/css/styles.css',
    customSiteTitle: "QUALITY AIR API",
}));

//Docs in JSON format
app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
})

//API Endpoints
app.use('/airquality', qualityAirRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} !`);
});