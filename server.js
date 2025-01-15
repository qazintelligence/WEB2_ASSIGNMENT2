const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5559b82a7aca47c99d8b0d235df9e210');  // Your API key

const app = express();
const PORT = 3000;
const OPENWEATHER_API_KEY = 'c350104bfeadd8ce6381bdbd1a058ed1';

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City name is required.' });
    }

    try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: OPENWEATHER_API_KEY,
                units: 'metric',
            },
        });

        const weatherData = weatherResponse.data;


        const newsResponse = await newsapi.v2.topHeadlines({
            country: 'us',
            category: 'general',
            language: 'en',
        });

        const newsData = newsResponse.articles;

        const result = {
            city: weatherData.name,
            temperature: weatherData.main.temp,
            feels_like: weatherData.main.feels_like,
            description: weatherData.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            coordinates: {
                lat: weatherData.coord.lat,
                lon: weatherData.coord.lon,
            },
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            wind_speed: weatherData.wind.speed,
            country: weatherData.sys.country,
            news: newsData.slice(0, 5),
        };

        res.json(result);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: 'Failed to fetch data. Please try again.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
