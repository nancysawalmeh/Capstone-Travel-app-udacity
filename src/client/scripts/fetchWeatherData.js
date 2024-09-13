const axios = require("axios");
 const fetchWeatherData = async (longitude, latitude, daysUntilTrip) => {
    try {
        const response = await axios.post("http://localhost:8000/getweather", {
            lng: longitude,
            lat: latitude,
            radya: daysUntilTrip,
        });
        return response.data;
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};
module.exports={fetchWeatherData}