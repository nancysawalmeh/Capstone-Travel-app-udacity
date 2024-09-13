const axios = require("axios");

const getweather = async (lat, lng, radya, weatherKey) => {
    if (radya < 0) {
        return {
            message: "Date cannot be in the past",
            error: true,
        };
    }

    try {
        if (radya > 0 && radya <= 7) {
            const { data } = await axios.get(`https://api.weatherbit.io/v2.0/current`, {
                params: {
                    lat,
                    lon: lng,
                    units: "M",
                    key: weatherKey
                }
            });
            const { weather, temp } = data.data[data.data.length - 1];
            const { description } = weather;
            const weatherData = { description, temp };

            console.log("Current Weather Data:", weatherData);
            return weatherData;
        } else if (radya > 7) {
            const { data } = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily`, {
                params: {
                    lat,
                    lon: lng,
                    units: "M",
                    days: radya,
                    key: weatherKey
                }
            });
            const { weather, temp, app_max_temp, app_min_temp } = data.data[data.data.length - 1];
            const { description } = weather;
            const weatherData = { description, temp, app_max_temp, app_min_temp };

            console.log("Forecast Weather Data:", weatherData);
            return weatherData;
        }
    } catch (error) {
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
