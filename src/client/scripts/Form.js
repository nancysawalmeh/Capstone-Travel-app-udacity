import axios from "axios";
import { getradya } from "./getradya";
import { fetchWeatherData } from "./fetchWeatherData";
import { fetchCityData } from "./fetchCityData";
const formElement = document.querySelector("form");
const cityInputElement = document.getElementById("city");
const cityErrorElement = document.getElementById("city-error");
const dateInputElement = document.querySelector("#date");
const dateErrorElement = document.getElementById("date-error");

const processFormSubmission = async (event) => {
    event.preventDefault();
    console.log("Form processing started...");

    if (!validateInputs()) {
        return;
    }

    const locationData = await fetchCityData();
    if (locationData && locationData.error) {
        showError(cityErrorElement, locationData.message);
        return;
    } else if (locationData && !locationData.error) {
        const { name, lng, lat } = locationData;
        const selectedDate = dateInputElement.value;

        if (!selectedDate) {
            console.log("Date is required");
            showError(dateErrorElement, "Please enter the date");
            return;
        }

        if (lng && lat) {
            const daysUntilTrip = getradya(selectedDate);
            const weatherData = await fetchWeatherData(lng, lat, daysUntilTrip);

            if (weatherData && weatherData.error) {
                showError(dateErrorElement, weatherData.message);
                return;
            }

            const cityImage = await fetchCityImage(name);
            updateUI(daysUntilTrip, name, cityImage, weatherData);
        }
    }
};



const fetchCityImage = async (cityName) => {
    try {
        const response = await axios.post("http://localhost:8000/getCitypic", { name: cityName });
        return response.data.image;
    } catch (error) {
        console.error("Error fetching city image:", error);
    }
};

const updateUI = (daysUntilTrip, cityName, cityImage, weatherData) => {
    document.querySelector("#Rdays").innerHTML = `Your trip starts in ${daysUntilTrip} days from now.`;
    document.querySelector(".cityName").textContent = `Location: ${cityName}`;
    document.querySelector(".weather").textContent = daysUntilTrip > 7
        ? `Weather is: ${weatherData.description}`
        : `Weather is expected to be: ${weatherData.description}`;
    document.querySelector(".temp").innerHTML = daysUntilTrip > 7
        ? `Forecast: ${weatherData.temp}&degC`
        : `Temperature: ${weatherData.temp}&degC`;
    document.querySelector(".max-temp").innerHTML = daysUntilTrip > 7
        ? `Max-Temp: ${weatherData.app_max_temp}&degC`
        : "";
    document.querySelector(".min-temp").innerHTML = daysUntilTrip > 7
        ? `Min-Temp: ${weatherData.app_min_temp}&degC`
        : "";
    document.querySelector(".cityPic").innerHTML = `
        <img src="${cityImage}" alt="City image showing the nature of ${cityName}">
    `;
    document.querySelector(".flight-data").style.display = "block";
};

const validateInputs = () => {
    clearErrors();
    if (!cityInputElement.value) {
        showError(cityErrorElement, "You need to enter the city");
        return false;
    }
    if (!dateInputElement.value) {
        showError(dateErrorElement, "Please enter the date");
        return false;
    }
    if (getradya(dateInputElement.value) < 0) {
        showError(dateErrorElement, "Date cannot be in the past");
        return false;
    }
    return true;
};

const showError = (element, message) => {
    element.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${message}`;
    element.style.display = "block";
};

const clearErrors = () => {
    cityErrorElement.style.display = "none";
    dateErrorElement.style.display = "none";
};

export { processFormSubmission };
