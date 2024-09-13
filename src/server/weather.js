const axios = require("axios");

// Function to get weather data based on latitude, longitude, and "radya" (which seems to represent the number of days)
const getweather = async (lat, lng, radya, weatherKey) => {
    // Check if the provided "radya" value (days in the future) is less than 0, meaning the date is in the past
    if (radya < 0) {
        return {
            message: "Date cannot be in the past", 
            error: true,
        };
    }

    try {
        // If "radya" is between 1 and 7, fetch current weather data
        if (radya > 0 && radya <= 7) {
            // Make an API request to get the current weather using the latitude, longitude, and API key
            const { data } = await axios.get(`https://api.weatherbit.io/v2.0/current`, {
                params: {
                    lat, 
                    lon: lng, 
                    units: "M", 
                    key: weatherKey 
                }
            });

            // Destructure the last entry in the data array to get the relevant weather information
            const { weather, temp } = data.data[data.data.length - 1];
            const { description } = weather; 
            const weatherData = { description, temp };

            console.log("Current Weather Data:", weatherData); 
            return weatherData; 
        } 
        // If "radya" is greater than 7, fetch weather forecast data
        else if (radya > 7) {
            // Make an API request to get the daily forecast for the next "radya" days
            const { data } = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily`, {
                params: {
                    lat, 
                    lon: lng, 
                    units: "M", 
                    days: radya, 
                    key: weatherKey 
                }
            });

            // Destructure the last entry in the data array to get the relevant forecast information
            const { weather, temp, app_max_temp, app_min_temp } = data.data[data.data.length - 1];
            const { description } = weather; 
            const weatherData = { description, temp, app_max_temp, app_min_temp }; 

            console.log("Forecast Weather Data:", weatherData); 
            return weatherData; 
        }
    } catch (error) {
        // Handle errors during the API request
        console.error("Error fetching weather data:", error);
        return {
            message: "Failed to fetch weather data", 
            error: true
        };
    }
};

module.exports = {
    getweather
};
