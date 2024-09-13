const axios = require("axios");
const { fetchWeatherData }= require ("../scripts/fetchWeatherData"); 
const MockAdapter = require("axios-mock-adapter");
describe("fetchWeatherData", () => {
  let mock;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it("should fetch weather data successfully", async () => {
    const longitude = 40.7128;
    const latitude = -74.0060;
    const daysUntilTrip = 3;

    const mockWeatherData = { weather: "sunny", temperature: 30 };

    mock.onPost("http://localhost:8000/getweather", {
      lng: longitude,
      lat: latitude,
      radya: daysUntilTrip,
    }).reply(200, mockWeatherData);

    const data = await fetchWeatherData(longitude, latitude, daysUntilTrip);
    expect(data).toEqual(mockWeatherData);
  });

  it("should handle errors while fetching weather data", async () => {
    const longitude = 40.7128;
    const latitude = -74.0060;
    const daysUntilTrip = 3;
    mock.onPost("http://localhost:8000/getweather").reply(500);

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const data = await fetchWeatherData(longitude, latitude, daysUntilTrip);

    expect(data).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching weather data:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
