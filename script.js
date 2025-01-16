// const form = document.getElementById("weather-form");
// const result = document.getElementById("result");
//
// form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const city = document.getElementById("city").value;
//
//     try {
//         const weatherRes = await fetch(`http://localhost:3000/weather?city=${city}`);
//         const weatherData = await weatherRes.json();
//
//
//         result.innerHTML = `
//             <h2>Weather in ${city}</h2>
//             <p>Temperature: ${weatherData.temperature}°C</p>
//             <p>Feels Like: ${weatherData.feels_like}°C</p>
//             <p>Description: ${weatherData.description}</p>
//             <img src="${weatherData.icon}" alt="Weather Icon">
//             <p>Latitude: ${weatherData.coordinates.lat}, Longitude: ${weatherData.coordinates.lon}</p>
//             <p>Humidity: ${weatherData.humidity}%</p>
//             <p>Pressure: ${weatherData.pressure} hPa</p>
//             <p>Wind Speed: ${weatherData.wind_speed} m/s</p>
//         `;
//     } catch (error) {
//         result.innerHTML = <p>Failed to fetch data. Please try again.</p>;
//     }
// });

// const form = document.getElementById("weather-form");
// const result = document.getElementById("result");
//
// form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const city = document.getElementById("city").value;
//     result.innerHTML = "<p>Loading...</p>";
//
//     try {
//         const weatherRes = await fetch(`http://localhost:3000/weather?city=${city}`);
//         const weatherData = await weatherRes.json();
//
//         if (weatherRes.ok) {
//             result.innerHTML = `
//                 <h2>Weather in ${weatherData.city}, ${weatherData.country}</h2>
//                 <p>Temperature: ${weatherData.temperature}°C</p>
//                 <p>Feels Like: ${weatherData.feels_like}°C</p>
//                 <p>Description: ${weatherData.description}</p>
//                 <img src="${weatherData.icon}" alt="Weather Icon">
//                 <p>Latitude: ${weatherData.coordinates.lat}, Longitude: ${weatherData.coordinates.lon}</p>
//                 <p>Timezone: ${weatherData.timezone}</p>
//                 <p>Current Time: ${weatherData.current_time}</p>
//                 <h3>Top News:</h3>
//                 <ul>
//                     ${weatherData.news.map(article => `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`).join('')}
//                 </ul>
//                 <div id="map" style="height: 400px;"></div>
//             `;
//
//             const map = L.map('map').setView([weatherData.coordinates.lat, weatherData.coordinates.lon], 10);
//             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                 attribution: '© OpenStreetMap contributors'
//             }).addTo(map);
//             L.marker([weatherData.coordinates.lat, weatherData.coordinates.lon]).addTo(map)
//                 .bindPopup(`${weatherData.city}, ${weatherData.country}`)
//                 .openPopup();
//         } else {
//             throw new Error(weatherData.error || "An error occurred");
//         }
//     } catch (error) {
//         result.innerHTML = `<p>Failed to fetch data. Error: ${error.message}</p>`;
//     }
// });

//
// document.addEventListener("DOMContentLoaded", function() {
//     const form = document.getElementById("weather-form");
//     const result = document.getElementById("result");
//
//     form.addEventListener("submit", async function(event) {
//         event.preventDefault(); // Prevent default form submission
//
//         const city = document.getElementById("city").value; // Get city input
//         result.innerHTML = "<p>Loading...</p>"; // Show loading state
//
//         if (!city) {
//             result.innerHTML = "<p>Please enter a city name.</p>"; // Ensure city is entered
//             return;
//         }
//
//         try {
//             // Make a fetch request to the backend server
//             const weatherRes = await fetch(`http://localhost:3000/weather?city=${city}`);
//             const weatherData = await weatherRes.json();
//
//             // If the response is successful, update the page with weather data
//             if (weatherRes.ok) {
//                 result.innerHTML = `
//                     <h2>Weather in ${weatherData.city}, ${weatherData.country}</h2>
//                     <p>Temperature: ${weatherData.temperature}°C</p>
//                     <p>Feels Like: ${weatherData.feels_like}°C</p>
//                     <p>Description: ${weatherData.description}</p>
//                     <img src="${weatherData.icon}" alt="Weather Icon">
//                     <p>Coordinates: Latitude: ${weatherData.coordinates.lat}, Longitude: ${weatherData.coordinates.lon}</p>
//                     <p>Timezone: ${weatherData.timezone}</p>
//                     <p>Current Time: ${weatherData.current_time}</p>
//                     <h3>Top News:</h3>
//                     <ul>
//                         ${weatherData.news.map(article => `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`).join('')}
//                     </ul>
//                     <div id="map" style="height: 400px;"></div>
//                 `;
//
//                 // Initialize the map
//                 const map = L.map('map').setView([weatherData.coordinates.lat, weatherData.coordinates.lon], 10);
//                 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                     attribution: '© OpenStreetMap contributors'
//                 }).addTo(map);
//                 L.marker([weatherData.coordinates.lat, weatherData.coordinates.lon]).addTo(map)
//                     .bindPopup(`${weatherData.city}, ${weatherData.country}`)
//                     .openPopup();
//             } else {
//                 throw new Error(weatherData.error || "An error occurred");
//             }
//         } catch (error) {
//             result.innerHTML = `<p>Failed to fetch data. Error: ${error.message}</p>`;
//         }
//     });
// });
