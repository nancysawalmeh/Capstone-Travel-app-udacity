const axios = require("axios");
const { getCitypic } = require("../../server/picture.js");
jest.mock("axios");

describe("getCitypic", () => {
    let consoleError;

    beforeAll(() => {
        // Mock console.error to suppress error logs
        consoleError = console.error;
        console.error = jest.fn();
    });

    afterAll(() => {
        // Restore console.error
        console.error = consoleError;
    });

    it("should return an image URL when the API call is successful and images are returned", async () => {
        axios.get.mockResolvedValue({
            data: {
                hits: [
                    { webformatURL: "https://example.com/image1.jpg" }
                ]
            }
        });

        const result = await getCitypic("Paris", "fake-key");
        expect(result.image).toBe("https://example.com/image1.jpg");
    });

    it("should return a default Unsplash image URL when no images are returned", async () => {
        axios.get.mockResolvedValue({
            data: { hits: [] }
        });

        const result = await getCitypic("UnknownCity", "fake-key");
        expect(result.image).toBe("https://source.unsplash.com/random/640x480?city,morning,night?sig=1");
    });

    it("should return a different default Unsplash image URL when there's an error", async () => {
        axios.get.mockRejectedValue(new Error("API error"));

        const result = await getCitypic("Paris", "fake-key");
        expect(result.image).toBe("https://source.unsplash.com/random/640x480?city,morning,night?sig=2");
    });
});
