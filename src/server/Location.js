const axios = require("axios"); 

// Define an asynchronous function to get the city location from the GeoNames API
const getcityloc = async (city, username) => {
    try {
        // Make a GET request to the GeoNames API with the city name and username as parameters
        const { data } = await axios.get(`https://secure.geonames.org/searchJSON`, {
            params: {
                q: city,         
                maxRows: 1,      
                username: username 
            }
        });

        // If no results are found, return an error message
        if (!data.geonames || data.geonames.length === 0) {
            return {
                message: "No city with that name. Please check your spelling.", 
                error: true 
            };
        }

        // Extract the name, latitude, and longitude of the city from the API response
        const { name, lat, lng } = data.geonames[0];
        return { name, lat, lng }; 
    } catch (error) {
        // Log the error in case of failure and return a generic error message
        console.error('Error fetching city location:', error);
        return {
            message: "An error occurred while fetching the city location.", 
            error: true
        };
    }
};

module.exports = { getcityloc }; 
