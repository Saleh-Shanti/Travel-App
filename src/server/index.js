
const fetch = require('node-fetch');
const { default: axios } = require("axios");
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// API's Cerdtintial

const Geonames="salehshanti_"
const pixabyAPI="24218171-a2f86e582c838a85e68cd4227";
const weatherbitAPI_KEY="7420d56bd88d4fa5aad9d48dbd33e69e";


app.use(cors());
app.use(bodyParser());
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

app.listen(8081, (error) => {
    if (error)
    {console.log(error)}
    console.log('Server listening on port 8081!')
})

app.post('/result', (req, res) => {

    
        // Geonames API 
        const geoAPI_URL  = (`http://api.geonames.org/searchJSON?name=${req.body.country}&maxRows=1&username=${Geonames}`);
    
        // Get Geonames Data
        fetch (geoAPI_URL )
        .then (res => res.json())
        .then (geonames_Data => {
            
            // Validation: Location
            if (geonames_Data.geonames[0] == null) {
                res.status(404).json({location:'invalid'});
                return;
            }
    

            // Weatherbit API API
            const weatherbitAPI_URL  = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${geonames_Data.geonames[0].lat}&lon=${geonames_Data.geonames[0].lng}&key=${weatherbitAPI_KEY}`;
    
            fetch (weatherbitAPI_URL )
            .then (res => res.json())
            .then (weather_Data => {
    
                // Pixabay API
                const pixabayAPI_URL = `https://pixabay.com/api/?key=${pixabyAPI}&q=${req.body.country}&image_type=photo&editors_choice=true&per_page=3`;
    
                fetch (pixabayAPI_URL )
                .then (res => res.json())
                .then (pixabay_Data => {

                    const pixabayDefault = `https://pixabay.com/api/?key=${pixabyAPI}&q=travel&image_type=photo&editors_choice=true&per_page=3`;
                    fetch (pixabayDefault)
                    .then (res => res.json())
                    .then (pixabay_Default => {
                    res.send({geonames_Data, weather_Data, pixabay_Data, pixabay_Default});
                    })
                })
            })
        })
    
        .catch (error => {
            res.send(error);
        });
    });

module.exports = {
    app,
}