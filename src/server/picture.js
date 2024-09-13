const axios = require("axios");

// Define an asynchronous function to get the city image from Pixabay API
const getCitypic = async (name, pixabayKey) => {
    try {
        // Make a GET request to the Pixabay API with the city name and API key as parameters
        const { data } = await axios.get(`https://pixabay.com/api/`, {
            params: {
                key: pixabayKey, 
                q: name,         
                image_type: "photo" 
            }
        });

        /* Check if there are any images in the API response
         If there is at least one image, return the URL of the first one
         If not, return a random city image from Unsplash*/
        const image = data.hits.length > 0 
            ? data.hits[0].webformatURL 
            : "https://source.unsplash.com/random/640x480?city,morning,night?sig=1";
        
        return { image }; 
    } catch (error) {
        // In case of any errors during the API request, log the error
        console.error("Error fetching city image:", error);
        return { image: "https://source.unsplash.com/random/640x480?city,morning,night?sig=2" }; 
    }
};

module.exports = {
    getCitypic
};
