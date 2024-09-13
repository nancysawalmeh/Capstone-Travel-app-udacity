import axios from "axios";
 const cityInputElement = document.getElementById("city");
 const cityErrorElement = document.getElementById("city-error");
 
 
const fetchCityData = async () => {
    console.log("Fetching city data...");
    if (cityInputElement && cityInputElement.value) {
        try {
            const cityForm = { city: cityInputElement.value };
            const response = await axios.post("http://localhost:8000/getCity", cityForm, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    } else {
        showError(cityErrorElement, "This field cannot be left empty");
    }
};
export{fetchCityData}