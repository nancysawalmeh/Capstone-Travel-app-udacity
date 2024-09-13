const axios = require("axios"); 

// Define an async function to fetch weather data from the server
const fetchWeatherData = async (longitude, latitude, daysUntilTrip) => {
    try {
        // Send a POST request to the server with the longitude, latitude, and days until the trip
        const response = await axios.post("http://localhost:8000/getweather", {
            lng: longitude,     
            lat: latitude,           
            radya: daysUntilTrip,   
        });

        // Log the response data to the console for debugging purposes
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

module.exports = { fetchWeatherData };
