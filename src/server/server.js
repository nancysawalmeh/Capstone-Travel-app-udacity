// Import necessary modules
const express = require("express"); // Framework for building web servers
const bodyParser = require("body-parser"); // Middleware to parse incoming request bodies
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing
const dotenv = require("dotenv"); // Module to load environment variables from a .env file
const { getcityloc } = require("./Location"); 
const { getweather } = require("./weather"); 
const { getCitypic } = require("./picture"); 
dotenv.config();
const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());
app.use(bodyParser.json()); 
app.use(express.static("dist"));
app.use(cors());

// Fetch environment variables for API credentials
const username = process.env.name; 
const weather_key = process.env.WEATHER_KEY; 
const pixabay_key = process.env.PIXABAY_KEY; 

// Set the port for the server
const port = 8000;
console.log(username);

app.get("/", (req, res) => {
  res.sendFile("index.html"); 
});

// Route to get city location data
app.post("/getCity", async (req, res) => {
  const { city } = req.body;
  const Location = await getcityloc(city, username); 
  res.send(Location); 
  console.log(Location); 
});

// Route to get weather data
app.post("/getweather", async (req, res) => {
  console.log(req.body); 
  const { lat, lng, radya } = req.body; 
  const Weather = await getweather(lat, lng, radya, weather_key); 
  res.send(Weather); 
});

// Route to get city picture
app.post("/getCitypic", async (req, res) => {
  const { name } = req.body;
  console.log(name); 
  const Picture = await getCitypic(name, pixabay_key); 
  res.send(Picture);
});

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server is listening on port ${port}`)); 
