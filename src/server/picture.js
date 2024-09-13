const axios = require("axios");

const getCitypic = async (name, pixabayKey) => {
    try {
        const { data } = await axios.get(`https://pixabay.com/api/`, {
            params: {
                key: pixabayKey,
                q: name,
                image_type: "photo"
            }
        });
        const image = data.hits.length > 0 
            ? data.hits[0].webformatURL 
            : "https://source.unsplash.com/random/640x480?city,morning,night?sig=1";
        
        return { image };
    } catch (error) {
        console.error("Error fetching city image:", error);
        return { image: "https://source.unsplash.com/random/640x480?city,morning,night?sig=2" }; 
    }
};

module.exports = {
    getCitypic
};
