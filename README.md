**Weather and News Web App**
A simple web app that provides weather information and the latest news for a city using OpenWeather API and NewsAPI.

**Technologies Used**
Node.js
Express.js
Axios
OpenWeather API
NewsAPI

**1.Install dependencies:**
npm install

**2.Add your API keys:**
Open the server.js file and replace the placeholders for OPENWEATHER_API_KEY and NEWS_API_KEY with your actual API keys.

const OPENWEATHER_API_KEY = 'your-openweather-api-key';
const NEWS_API_KEY = 'your-newsapi-key';

**3.Run the app:**
node server.js

Key Design Decisions
Modular Backend: Separate routes for weather and news data.
External APIs: OpenWeather and NewsAPI for reliable weather and news data.
Asynchronous Calls: Using Axios for non-blocking requests.
CORS: Enabled to allow client-side access.
