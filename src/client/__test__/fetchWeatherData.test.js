const axios = require("axios");
const { fetchWeatherData } = require("../scripts/fetchWeatherData"); 
const MockAdapter = require("axios-mock-adapter");

describe("fetchWeatherData", () => {
  let mock;

  // Set up the mock adapter before running tests
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  // Reset the mock adapter after each test
  afterEach(() => {
    mock.reset();
  });

  // Test case for successful weather data fetch
  it("should fetch weather data successfully", async () => {
    const longitude = 40.7128;
    const latitude = -74.0060;
    const daysUntilTrip = 3;

    // Mock data for successful API response
    const mockWeatherData = { weather: "sunny", temperature: 30 };

    // Configure mock to return mockWeatherData for the given request
    mock.onPost("http://localhost:8000/getweather", {
      lng: longitude,
      lat: latitude,
      radya: daysUntilTrip,
    }).reply(200, mockWeatherData);

    // Call the function and verify the result matches the mock data
    const data = await fetchWeatherData(longitude, latitude, daysUntilTrip);
    expect(data).toEqual(mockWeatherData);
  });

  // Test case for handling errors during weather data fetch
  it("should handle errors while fetching weather data", async () => {
    const longitude = 40.7128;
    const latitude = -74.0060;
    const daysUntilTrip = 3;

    // Configure mock to return a 500 error for the API request
    mock.onPost("http://localhost:8000/getweather").reply(500);

    // Spy on console.error to check if it’s called correctly
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    // Call the function and verify it handles the error properly
    const data = await fetchWeatherData(longitude, latitude, daysUntilTrip);
    expect(data).toBeUndefined(); // Check that the function returns undefined on error
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching weather data:",
      expect.any(Error) // Verify console.error was called with an Error
    );

    // Restore console.error to its original state
    consoleSpy.mockRestore();
  });
});
