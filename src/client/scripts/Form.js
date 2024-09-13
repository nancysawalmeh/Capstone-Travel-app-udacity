import axios from "axios";
import { getradya } from "./getradya";
import { fetchWeatherData } from "./fetchWeatherData";
import { fetchCityData } from "./fetchCityData";
// DOM element references
const formElement = document.querySelector("form");
const cityInputElement = document.getElementById("city");
const cityErrorElement = document.getElementById("city-error");
const dateInputElement = document.querySelector("#date");
const dateErrorElement = document.getElementById("date-error");

// Handles form submission
const processFormSubmission = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    console.log("Form processing started...");

    // Validate input fields
    if (!validateInputs()) {
        return;
    }

    // Fetch city data
    const locationData = await fetchCityData();
    if (locationData && locationData.error) {
        showError(cityErrorElement, locationData.message);
        return;
    }

    // Proceed if no error in city data
    if (locationData && !locationData.error) {
        const { name, lng, lat } = locationData;
        const selectedDate = dateInputElement.value;

        if (!selectedDate) {
            console.log("Date is required");
            showError(dateErrorElement, "Please enter the date");
            return;
        }

        if (lng && lat) {
            // Calculate days until the trip
            const daysUntilTrip = getradya(selectedDate);
            // Fetch weather data
            const weatherData = await fetchWeatherData(lng, lat, daysUntilTrip);

            if (weatherData && weatherData.error) {
                showError(dateErrorElement, weatherData.message);
                return;
            }

            // Fetch city image
            const cityImage = await fetchCityImage(name);
            // Update UI with fetched data
            updateUI(daysUntilTrip, name, cityImage, weatherData);
        }
    }
};

// Fetch city image from the server
const fetchCityImage = async (cityName) => {
    try {
        const response = await axios.post("http://localhost:8000/getCitypic", { name: cityName });
        return response.data.image;
    } catch (error) {
        console.error("Error fetching city image:", error);
    }
};

// Update the UI with the weather and city information
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

// Validate form inputs
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

// Display error messages
const showError = (element, message) => {
    element.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${message}`;
    element.style.display = "block";
};

// Clear error messages
const clearErrors = () => {
    cityErrorElement.style.display = "none";
    dateErrorElement.style.display = "none";
};

export { processFormSubmission };
