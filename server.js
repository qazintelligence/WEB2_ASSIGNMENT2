// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('5559b82a7aca47c99d8b0d235df9e210');
//
// const app = express();
// const PORT = 3000;
// const OPENWEATHER_API_KEY = 'c350104bfeadd8ce6381bdbd1a058ed1';
//
// app.use(cors());
//
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });
//
// app.get('/weather', async (req, res) => {
//     const city = req.query.city;
//
//     if (!city) {
//         return res.status(400).json({ error: 'City name is required.' });
//     }
//
//     try {
//         const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
//             params: {
//                 q: city,
//                 appid: OPENWEATHER_API_KEY,
//                 units: 'metric',
//             },
//         });
//
//         const weatherData = weatherResponse.data;
//
//
//         const newsResponse = await newsapi.v2.topHeadlines({
//             country: 'us',
//             category: 'general',
//             language: 'en',
//         });
//
//         const newsData = newsResponse.articles;
//
//         const result = {
//             city: weatherData.name,
//             temperature: weatherData.main.temp,
//             feels_like: weatherData.main.feels_like,
//             description: weatherData.weather[0].description,
//             icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
//             coordinates: {
//                 lat: weatherData.coord.lat,
//                 lon: weatherData.coord.lon,
//             },
//             humidity: weatherData.main.humidity,
//             pressure: weatherData.main.pressure,
//             wind_speed: weatherData.wind.speed,
//             country: weatherData.sys.country,
//             news: newsData.slice(0, 5),
//         };
//
//         res.json(result);
//     } catch (error) {
//         console.error("Error fetching data:", error.message);
//         res.status(500).json({ error: 'Failed to fetch data. Please try again.' });
//     }
// });
//
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });




const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();

const PORT = 3000;
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const TIMEZONE_API_KEY = "K6VJRH8NP0G4";

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const data = response.data;

        res.json({
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            coordinates: {
                lat: data.coord.lat,
                lon: data.coord.lon,
            },
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

app.get("/timezone", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    try {
        const geoResponse = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_API_KEY}`
        );

        if (!geoResponse.data.length) {
            return res.status(404).json({ error: "City not found" });
        }

        const { lat, lon } = geoResponse.data[0];

        const timezoneResponse = await axios.get(
            `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`
        );

        const timezoneData = timezoneResponse.data;

        if (timezoneData.status === "FAILED") {
            return res.status(400).json({ error: timezoneData.message });
        }

        res.json({
            city: city,
            time_zone: timezoneData.zoneName,
            current_time: timezoneData.formatted,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching timezone data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});