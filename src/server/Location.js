const axios = require("axios");

const getcityloc = async (city, username) => {
    try {
        const { data } = await axios.get(`https://secure.geonames.org/searchJSON`, {
            params: {
                q: city,
                maxRows: 1,
                username: username
            }
        });

        if (!data.geonames || data.geonames.length === 0) {
            return {
                message: "No city with that name. Please check your spelling.",
                error: true
            };
        }

        const { name, lat, lng } = data.geonames[0];
        return { name, lat, lng };
    } catch (error) {
        console.error('Error fetching city location:', error);
        return {
            message: "An error occurred while fetching the city location.",
            error: true
        };
    }
};

module.exports = { getcityloc };
